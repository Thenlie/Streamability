import { useEffect, useState } from 'react';
import { useSessionContext, useProfileContext } from '../hooks';
import {
    deleteProfileById,
    updateProfileUsername,
    getProfileQueue,
    setProfileAdultFlag,
    setProfileCountry,
    removeProfileArray,
} from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FilledInput,
    FormControl,
    InputLabel,
    Modal,
    Typography,
} from '@mui/material';
import {
    Close,
    Delete,
    Edit,
    Language,
    Logout,
    NoAdultContent,
    WarningSharp,
} from '@mui/icons-material';
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
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [country, setCountry] = useState('');
    const [isAdult, setIsAdult] = useState<boolean | null>(null);
    const [queue, setQueue] = useState<ShowData[] | null>(null);
    const navigate = useNavigate();

    LOG.debug(JSON.stringify(profile));

    const fallbackText = 'Your queue is empty! Add shows to your watch queue to view them here.';

    if (!session) {
        return <Navigate to={'/auth/login'} />;
    }

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
            if (session.user.adult) setIsAdult(session.user.adult);
            LOG.debug(String(queue));
        };
        handler();
    }, [session]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 2,
        width: 400,
        boxShadow: 24,
    };

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
                    <Button
                        variant='contained'
                        size='large'
                        type='button'
                        color='secondary'
                        startIcon={<Edit />}
                        sx={{ m: 0.5, width: 210 }}
                        onClick={handleOpen}
                    >
                        Edit Profile
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={modalStyle}>
                            <div className='flex flex-col items-center bg-background p-4 rounded-md'>
                                <FormControl sx={{ m: 0.5 }} variant='filled'>
                                    <InputLabel
                                        htmlFor='username'
                                        color='secondary'
                                        className='!text-text'
                                    >
                                        Change Username
                                    </InputLabel>
                                    <FilledInput
                                        name='username'
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        inputProps={{ minLength: 3 }}
                                        sx={{ m: 0.5, width: 210 }}
                                    />
                                </FormControl>
                                <Button
                                    variant='contained'
                                    type='button'
                                    color='secondary'
                                    startIcon={<Edit />}
                                    sx={{ m: 0.5, width: 210 }}
                                    onClick={() => changeUsername()}
                                >
                                    Update Profile
                                </Button>
                                <FormControl sx={{ m: 0.5 }} variant='filled'>
                                    <InputLabel
                                        htmlFor='country'
                                        color='secondary'
                                        className='!text-text'
                                    >
                                        Change Country
                                    </InputLabel>
                                    <FilledInput
                                        name='country'
                                        onChange={(e) => {
                                            setCountry(e.target.value);
                                        }}
                                        inputProps={{ maxLength: 2, minLength: 2 }}
                                        sx={{ m: 0.5, width: 210 }}
                                    />
                                </FormControl>
                                <Button
                                    variant='contained'
                                    type='button'
                                    color='secondary'
                                    sx={{ m: 0.5, width: 210 }}
                                    onClick={() => changeCountry()}
                                    startIcon={<Language />}
                                >
                                    Change Country
                                </Button>
                                <Typography>
                                    Adult content is: {profile?.adult ? 'visible' : 'not visible'}
                                </Typography>
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
                                    color='error'
                                    startIcon={<Close />}
                                    sx={{ m: 0.5 }}
                                    onClick={() => toggleAdultFlag()}
                                >
                                    Close
                                </Button>
                            </div>
                        </Box>
                    </Modal>

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
                    <Button
                        variant='contained'
                        size='large'
                        color='error'
                        type='button'
                        sx={{ m: 0.5, width: 210 }}
                        startIcon={<WarningSharp />}
                        onClick={() => deleteProfile()}
                    >
                        Delete Profile
                    </Button>
                    {queue && (
                        <Button
                            variant='contained'
                            size='large'
                            color='error'
                            type='button'
                            sx={{ m: 0.5, width: 210 }}
                            startIcon={<Delete />}
                            onClick={() => clearQueue()}
                        >
                            Clear Queue
                        </Button>
                    )}
                </div>
                <div>
                    <ShowCarousel data={queue} fallbackText={fallbackText} />
                </div>
            </section>
        </>
    );
}
