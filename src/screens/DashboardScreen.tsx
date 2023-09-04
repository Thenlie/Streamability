import { useEffect, useState } from 'react';
import { useSessionContext, useProfileContext } from '../hooks';
import { deleteProfileById, getProfileQueue, removeProfileArray } from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import { ShowData } from '../types';
import { ConfirmDeleteModal, EditProfileModal, ShowCarousel } from '../components';
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
export default function DashboardScreen(): JSX.Element {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const [queue, setQueue] = useState<ShowData[] | null>(null);
    const navigate = useNavigate();

    LOG.debug(JSON.stringify(profile));
    LOG.debug(JSON.stringify(session));

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
            const arr = [];
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
    }, [session]);

    /**
     * Delete profile row and auth entry.
     * We need to set the session to null here because
     * the util does not have access to the hook
     */
    const deleteProfile = async () => {
        if (session) {
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
                        variant='contained'
                        size='large'
                        type='button'
                        color='secondary'
                        sx={{ m: 0.5, width: 210 }}
                        startIcon={<Logout />}
                        onClick={() => SUPABASE.auth.signOut()}
                    >
                        Logout
                    </Button>
                    <ConfirmDeleteModal deleteProfile={deleteProfile} />
                </div>
                <div>
                    <ShowCarousel data={queue} fallbackText={fallbackText} />
                    <Button
                        disabled={!queue || queue.length === 0}
                        variant='contained'
                        size='large'
                        color='error'
                        type='button'
                        sx={{ m: 0.5, width: 210 }}
                        startIcon={<Delete />}
                        onClick={clearQueue}
                    >
                        Clear Queue
                    </Button>
                </div>
            </section>
        </>
    );
}
