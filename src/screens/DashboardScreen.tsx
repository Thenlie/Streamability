import React, { useEffect, useState } from 'react';
import { useSessionContext, useProfileContext, useProfileActions } from '../hooks';
import { deleteProfileById, getProfileQueue, removeProfileArray } from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import { ShowData } from '../types';
import { ConfirmDeleteModal, EditProfileModal, ShowCarousel, Button } from '../components';
import { SUPABASE, getMovieDetails, getTvDetails } from '../helpers';
import Logger from '../logger';

const LOG = new Logger('DashboardScreen');

/**
 * A logged in users profile screen. This is used to display
 * users personal information, queue, favorites and anything
 * else related directly to a user.
 *
 * @returns {JSX.Element} | A single users profile page
 */
const DashboardScreen: React.FC = (): JSX.Element => {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const profileActions = useProfileActions(profile, setProfile);
    const [queue, setQueue] = useState<ShowData[] | null>(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    const fallbackText = 'Your queue is empty! Add shows to your watch queue to view them here.';

    // If the user is not logged in, redirect to login
    if (!session || !profile) {
        return <Navigate to={'/auth/login'} />;
    }

    // On page load get the users watch queue
    useEffect(() => {
        const handler = async () => {
            if (!session) return;
            const queue = await getProfileQueue(session.user.id);
            if (!queue) return;
            const arr: ShowData[] = [];
            for (let i = 0; i < queue.length; i++) {
                if (queue[i].includes('tv-')) {
                    const tvShow = await getTvDetails(parseInt(queue[i].slice(3)));
                    arr.push(tvShow);
                } else {
                    const movie = await getMovieDetails(parseInt(queue[i].slice(6)));
                    arr.push(movie);
                }
            }
            setQueue(arr);
            LOG.debug(String(queue));
        };
        handler();
    }, [session, profile]);

    /**
     * Delete profile row and auth entry.
     * We need to set the session to null here because
     * the util does not have access to the hook
     */
    const deleteProfile = async () => {
        if (session) {
            setDeleteLoading(true);
            await deleteProfileById(session.user.id);
            setProfile(null);
            setSession(null);
            navigate('/');
        }
    };

    /**
     * Remove all shows from the users watch queue.
     * Displayed below the queue carousel.
     */
    const clearQueue = async () => {
        if (session) {
            await removeProfileArray(session.user.id, 'queue');
            setQueue(null);
        }
    };

    /**
     * Logout current user. When logged out user
     * is redirected to login page.
     */
    const handleLogout = async () => {
        setLogoutLoading(true);
        await SUPABASE.auth.signOut();
        setLogoutLoading(false);
    };

    return (
        <>
            <Typography variant='h5' m={2}>
                Welcome back {profile?.username}!
            </Typography>
            <section className='m-6 flex flex-col flex-1'>
                <div aria-live='polite' className='flex flex-col items-start justify-center m-2'>
                    <div className='m-1'>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                Email:{' '}
                            </Typography>
                            {session?.user.email}
                        </Typography>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                Username:{' '}
                            </Typography>
                            {profile?.username}
                        </Typography>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                Country of Origin:{' '}
                            </Typography>
                            {profile?.country}
                        </Typography>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                In Queue:{' '}
                            </Typography>
                            {profile?.queue?.length || 0}
                        </Typography>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                Watched:{' '}
                            </Typography>
                            {profile?.watched?.length || 0}
                        </Typography>
                        <Typography align='left'>
                            <Typography fontWeight={'bold'} display={'inline'}>
                                Favorites:{' '}
                            </Typography>
                            {profile?.favorites?.length || 0}
                        </Typography>
                    </div>

                    <EditProfileModal session={session} profile={profile} setProfile={setProfile} />

                    <Button
                        title='Logout'
                        loading={logoutLoading}
                        StartIcon={Logout}
                        onClick={handleLogout}
                    />
                    <ConfirmDeleteModal deleteProfile={deleteProfile} loading={deleteLoading} />
                </div>
                <div>
                    <ShowCarousel
                        data={queue}
                        fallbackText={fallbackText}
                        profile={profile}
                        profileActions={profileActions}
                        showQueueButton
                        showFavoritesButton
                        showWatchedButton
                    />
                    <Button
                        title='Clear Queue'
                        color='error'
                        disabled={!queue || queue.length === 0}
                        StartIcon={Delete}
                        onClick={clearQueue}
                    />
                </div>
            </section>
        </>
    );
};

export default DashboardScreen;
