import React, { useState } from 'react';
import {
    updateProfileUsername,
    setProfileAdultFlag,
    setProfileCountry,
} from '../../supabase/profiles';
import { Box, FilledInput, FormControl, InputLabel, Modal, Typography } from '@mui/material';
import { Close, Edit, Language, NoAdultContent } from '@mui/icons-material';
import { Profile, Session } from '../../types';
import Button from '../Button';

interface EditProfileModalProps {
    session: Session;
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

/**
 * A modal that allows the user to edit details
 * about their profile including the username,
 * country of origin and adult flag status.
 *
 * This will render to the screen as a button that
 * will open the modal when clicked.
 * @returns {JSX.Element}
 */
const EditProfileModal: React.FC<EditProfileModalProps> = ({
    session,
    profile,
    setProfile,
}): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState(false);
    const [isAdult, setIsAdult] = useState<boolean>(session.user.adult || false);

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
            <Button title='Edit Profile' startIcon={<Edit />} onClick={handleOpen} />
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
                        width: {
                            xs: 250,
                            sm: 500,
                        },
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
                            title='Change Username'
                            startIcon={<Edit />}
                            sx={{ width: 250, mb: 2 }}
                            onClick={changeUsername}
                        />
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
                            title='Change Country'
                            sx={{ width: 250, mb: 2 }}
                            startIcon={<Language />}
                            onClick={changeCountry}
                        />
                        <Typography>
                            Adult Content: {profile?.adult ? 'visible' : 'not visible'}
                        </Typography>
                        <Button
                            title='Toggle Adult Flag'
                            startIcon={<NoAdultContent />}
                            sx={{ width: 250, mb: 2 }}
                            onClick={toggleAdultFlag}
                        />
                        <Button
                            title='Close'
                            color='error'
                            sx={{ minWidth: 100 }}
                            startIcon={<Close />}
                            onClick={handleClose}
                        />
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default EditProfileModal;
