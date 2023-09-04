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
    ArrowBackIosNew,
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
 * A modal that allows the user to edit details
 * about their profile including the username,
 * country of origin and adult flag status.
 *
 * This will render to the screen as a button that
 * will open the modal when clicked.
 * @returns {JSX.Element}
 */
function EditProfileModal({ adult }: { adult: boolean | null }): JSX.Element {
    const { session } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState(false);
    const [isAdult, setIsAdult] = useState<boolean>(adult || false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUsername('');
        setUsernameError(false);
        setCountry('');
        setCountryError(false);
        setOpen(false);
    };

    const changeUsername = async () => {
        if (session && username.length > 2) {
            const data = await updateProfileUsername(session.user.id, username);
            setProfile(data);
            setUsername('');
        } else {
            setUsernameError(true);
        }
    };

    const toggleAdultFlag = async () => {
        if (session) {
            const data = await setProfileAdultFlag(session.user.id, !isAdult);
            setProfile(data);
            setIsAdult(!isAdult);
        }
    };

    const changeCountry = async () => {
        if (session && country.length === 2) {
            const data = await setProfileCountry(session.user.id, country);
            setProfile(data);
            setCountry('');
        } else {
            setCountryError(true);
        }
    };

    return (
        <>
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
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 2,
                        width: 400,
                        boxShadow: 24,
                    }}
                >
                    <div className='flex flex-col items-center bg-background p-4 rounded-md'>
                        <Typography variant='h5'>Edit Profile</Typography>
                        <FormControl sx={{ m: 0.5 }} variant='filled'>
                            <InputLabel htmlFor='username' color='secondary' className='!text-text'>
                                Change Username
                            </InputLabel>
                            <FilledInput
                                name='username'
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                error={usernameError}
                                onFocus={() => setUsernameError(false)}
                                inputProps={{ minLength: 3 }}
                                sx={{ m: 0.5, width: 210 }}
                            />
                        </FormControl>
                        <Typography>Current Username: {profile?.username}</Typography>
                        <Button
                            variant='contained'
                            type='button'
                            color='secondary'
                            startIcon={<Edit />}
                            sx={{ m: 0.5, width: 210, mb: 2 }}
                            onClick={() => changeUsername()}
                        >
                            Change Username
                        </Button>
                        <FormControl sx={{ m: 0.5 }} variant='filled'>
                            <InputLabel htmlFor='country' color='secondary' className='!text-text'>
                                Change Country
                            </InputLabel>
                            <FilledInput
                                name='country'
                                value={country}
                                onChange={(e) => {
                                    setCountry(e.target.value);
                                }}
                                error={countryError}
                                onFocus={() => setCountryError(false)}
                                inputProps={{ maxLength: 2, minLength: 2 }}
                                sx={{ m: 0.5, width: 210 }}
                            />
                        </FormControl>
                        <Typography>Current Country: {profile?.country}</Typography>
                        <Button
                            variant='contained'
                            type='button'
                            color='secondary'
                            sx={{ m: 0.5, width: 210, mb: 2 }}
                            onClick={() => changeCountry()}
                            startIcon={<Language />}
                        >
                            Change Country
                        </Button>
                        <Typography>
                            Adult Content: {profile?.adult ? 'visible' : 'not visible'}
                        </Typography>
                        <Button
                            variant='contained'
                            type='button'
                            color='secondary'
                            startIcon={<NoAdultContent />}
                            sx={{ m: 0.5, mb: 2 }}
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
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

/**
 * User must be logged in to access endpoint
 *
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
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

    const ConfirmDeleteModal = () => {
        const [open, setOpen] = useState(false);

        const handleOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        return (
            <>
                <Button
                    variant='contained'
                    size='large'
                    color='error'
                    type='button'
                    sx={{ m: 0.5, width: 210 }}
                    startIcon={<WarningSharp />}
                    onClick={handleOpen}
                >
                    Delete Profile
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: 2,
                            width: 400,
                            boxShadow: 24,
                        }}
                    >
                        <div className='flex flex-col items-center bg-background p-4 rounded-md'>
                            <Typography variant='h6' align='center'>
                                Are you sure you want to delete your profile?
                            </Typography>
                            <Typography mb={2}>
                                ⚠️ Warning! This action cannot be undone.
                            </Typography>
                            <Button
                                variant='contained'
                                size='large'
                                type='button'
                                color='error'
                                startIcon={<Delete />}
                                sx={{ m: 0.5, width: 210 }}
                                onClick={deleteProfile}
                            >
                                Yes
                            </Button>
                            <Button
                                variant='contained'
                                size='large'
                                type='button'
                                color='secondary'
                                startIcon={<ArrowBackIosNew />}
                                sx={{ m: 0.5, width: 210 }}
                                onClick={handleClose}
                            >
                                No
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </>
        );
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

                    <EditProfileModal adult={isAdult} />

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
                    <ConfirmDeleteModal />
                </div>
                <div>
                    <ShowCarousel data={queue} fallbackText={fallbackText} />
                    <Button
                        disabled={queue ? false : true}
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
                </div>
            </section>
        </>
    );
}
