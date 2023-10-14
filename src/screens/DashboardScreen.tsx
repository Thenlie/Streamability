import React, { useEffect, useState } from 'react';
import { useSessionContext, useProfileContext, useProfileActions } from '../hooks';
import { deleteProfileById, getProfileArray, clearProfileArray } from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography as Typ } from '@mui/material';
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
    const [favorites, setFavorites] = useState<ShowData[] | null>(null);
    const [watched, setWatched] = useState<ShowData[] | null>(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [clearQueueLoading, setClearQueueLoading] = useState(false);
    const navigate = useNavigate();

    const fallbackText = 'Your queue is empty! Add shows to your watch queue to view them here.';

    // If the user is not logged in, redirect to login
    if (!session || !profile) {
        return <Navigate to={'/auth/login'} replace />;
    }

    // On page load get the users watch queue
    useEffect(() => {
        const handler = async () => {
            if (!session) return;
            const queue = await getProfileArray(session.user.id, 'queue');
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

    // On page load get the users watch queue
    useEffect(() => {
        const handler = async () => {
            if (!session) return;
            const favorites = await getProfileArray(session.user.id, 'favorites');
            if (!favorites) return;
            const arr: ShowData[] = [];
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].includes('tv-')) {
                    const tvShow = await getTvDetails(parseInt(favorites[i].slice(3)));
                    arr.push(tvShow);
                } else {
                    const movie = await getMovieDetails(parseInt(favorites[i].slice(6)));
                    arr.push(movie);
                }
            }
            setFavorites(arr);
            LOG.debug(String(favorites));
        };
        handler();
    }, [session, profile]);

    // On page load get the users watch queue
    useEffect(() => {
        const handler = async () => {
            if (!session) return;
            const watched = await getProfileArray(session.user.id, 'watched');
            if (!watched) return;
            const arr: ShowData[] = [];
            for (let i = 0; i < watched.length; i++) {
                if (watched[i].includes('tv-')) {
                    const tvShow = await getTvDetails(parseInt(watched[i].slice(3)));
                    arr.push(tvShow);
                } else {
                    const movie = await getMovieDetails(parseInt(watched[i].slice(6)));
                    arr.push(movie);
                }
            }
            setWatched(arr);
            LOG.debug(String(watched));
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
            setClearQueueLoading(true);
            await clearProfileArray(session.user.id, 'queue');
            setQueue(null);
            setClearQueueLoading(false);
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
            <Typ variant='h5' m={2}>
                Welcome back {profile?.username}!
            </Typ>
            <section className='m-6 flex flex-col flex-1'>
                <div aria-live='polite' className='flex flex-col items-start justify-center m-2'>
                    <div className='text-left m-2'>
                        <Typ fontWeight='bold' display='inline'>
                            Email:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {session?.user.email}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Username:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.username}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Country of Origin:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.country}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            In Queue:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.queue?.length || 0}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Watched:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.watched?.length || 0}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Favorites:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.favorites?.length || 0}
                        </Typ>
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
                <div className='m-2'>
                    <Typ variant='h6' align='left'>
                        Watch Queue
                    </Typ>
                    <ShowCarousel
                        data={queue}
                        fallbackText={fallbackText}
                        profile={profile}
                        profileActions={profileActions}
                        showQueueButton
                    />
                    <Button
                        title='Clear Queue'
                        color='error'
                        disabled={!queue || queue.length === 0}
                        loading={clearQueueLoading}
                        StartIcon={Delete}
                        onClick={clearQueue}
                    />
                </div>
                <div className='m-2'>
                    <Typ variant='h6' align='left'>
                        Favorites
                    </Typ>
                    <ShowCarousel
                        data={favorites}
                        fallbackText={fallbackText}
                        profile={profile}
                        profileActions={profileActions}
                        showFavoritesButton
                    />
                    <Button
                        title='Clear Favorites'
                        color='error'
                        disabled={!queue || queue.length === 0}
                        loading={clearQueueLoading}
                        StartIcon={Delete}
                        onClick={clearQueue}
                    />
                </div>
                <div className='m-2'>
                    <Typ variant='h6' align='left'>
                        Watched Shows
                    </Typ>
                    <ShowCarousel
                        data={watched}
                        fallbackText={fallbackText}
                        profile={profile}
                        profileActions={profileActions}
                        showWatchedButton
                    />
                    <Button
                        title='Clear Watched'
                        color='error'
                        disabled={!queue || queue.length === 0}
                        loading={clearQueueLoading}
                        StartIcon={Delete}
                        onClick={clearQueue}
                    />
                </div>
            </section>
        </>
    );
};

export default DashboardScreen;
