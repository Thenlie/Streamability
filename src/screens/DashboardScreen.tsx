import { useEffect, useState } from 'react';
import { useSessionContext, useProfileContext } from '../hooks';
import {
    deleteProfileById,
    updateProfileUsername,
    getProfileWatchQueue,
    setProfileAdultFlag,
    setProfileCountry,
} from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, FilledInput, FormControl, InputLabel, Typography } from '@mui/material';
import { Edit, Language, Logout, NoAdultContent } from '@mui/icons-material';
import { ShowData } from '../types';
import { ShowCarousel } from '../components';
import { SUPABASE, getMovieDetails, getTvDetails } from '../helpers';
import Logger from '../logger';

const LOG = new Logger('DashboardScreen');

/**
 * User must be logged in to access endpoint
 *
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [isAdult, setIsAdult] = useState<boolean | null>();
    const [watchQueue, setWatchQueue] = useState<ShowData[] | null>(null);
    const navigate = useNavigate();

    if (!session) {
        return <Navigate to={'/auth/login'} />;
    }

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            if (!session) return;
            const queue = await getProfileWatchQueue(session.user.id);
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
            setWatchQueue(arr);
            if (session.user.adult) setIsAdult(session.user.adult);
            LOG.debug(String(queue));
            setLoading(false);
        };
        handler();
    }, [session]);

    const changeUsername = async () => {
        if (session && username.length > 2) {
            const data = await updateProfileUsername(session.user.id, username);
            setProfile(data);
        }
    };

    const toggleAdultFlag = async () => {
        if (session && isAdult) {
            const data = await setProfileAdultFlag(session.user.id, !isAdult);
            setProfile(data);
            setIsAdult(!isAdult);
        }
    };

    const changeCountry = async () => {
        if (session && country.length === 2) {
            const data = await setProfileCountry(session.user.id, country);
            setProfile(data);
        }
    };

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

    return (
        <section>
            <div aria-live='polite' className='flex flex-col items-center justify-center '>
                <div>
                    <Typography>Email: {session?.user.email}</Typography>
                    <Typography>Username: {profile?.username}</Typography>
                </div>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='username' color='secondary' className='!text-text'>
                        Change Username
                    </InputLabel>
                    <FilledInput
                        name='username'
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        inputProps={{ minLength: 3 }}
                        sx={{ m: 0.5 }}
                    />
                </FormControl>
                <Button
                    variant='contained'
                    type='button'
                    color='secondary'
                    startIcon={<Edit />}
                    sx={{ m: 0.5 }}
                    onClick={() => changeUsername()}
                >
                    Update Profile
                </Button>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='country' color='secondary' className='!text-text'>
                        Change Country
                    </InputLabel>
                    <FilledInput
                        name='country'
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                        inputProps={{ maxLength: 2, minLength: 2 }}
                        sx={{ m: 0.5 }}
                    />
                </FormControl>
                <Button
                    variant='contained'
                    type='button'
                    color='secondary'
                    sx={{ m: 0.5 }}
                    onClick={() => changeCountry()}
                    startIcon={<Language />}
                >
                    Change Country
                </Button>
                <Button
                    variant='contained'
                    type='button'
                    color='secondary'
                    startIcon={<NoAdultContent />}
                    sx={{ m: 0.5 }}
                    onClick={() => toggleAdultFlag()}
                >
                    Toggle Adult Flag
                </Button>
                <Button
                    variant='contained'
                    type='button'
                    color='secondary'
                    sx={{ m: 0.5 }}
                    startIcon={<Logout />}
                    onClick={() => SUPABASE.auth.signOut()}
                >
                    Sign Out
                </Button>
                <Button
                    variant='contained'
                    size='large'
                    color='error'
                    type='button'
                    sx={{ m: 0.5 }}
                    onClick={() => deleteProfile()}
                >
                    Delete Profile
                </Button>
            </div>
            {watchQueue && (
                <div>
                    <ShowCarousel data={watchQueue} isLoading={loading} />
                </div>
            )}
        </section>
    );
}
