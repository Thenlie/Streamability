import React, { useMemo, useState } from 'react';
import {
    updateProfileUsername,
    setProfileAdultFlag,
    setProfileCountry,
} from '../../supabase/profiles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import Typ from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Close from '@mui/icons-material/Close';
import Edit from '@mui/icons-material/Edit';
import Language from '@mui/icons-material/Language';
import NoAdultContent from '@mui/icons-material/NoAdultContent';
import { Profile, Session } from '../../types';
import Button from '../Button';
import { COUNTRIES, validateCountry } from '../../helpers';
import Snackbar, { SnackbarProps } from '../Snackbar';
import TextInput from '../TextInput';

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
    const [snackBarOptions, setSnackBarOptions] = useState<SnackbarProps>({
        isOpen: false,
        severity: 'success',
        message: '',
    });
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [country, setCountry] = useState('');
    const [countryError, setCountryError] = useState(false);
    const [countryLoading, setCountryLoading] = useState(false);
    const [isAdult, setIsAdult] = useState(session.user.adult || false);
    const [isAdultLoading, setIsAdultLoading] = useState(false);

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
            setUsernameLoading(true);
            const data = await updateProfileUsername(session.user.id, username);
            setProfile(data);
            setUsername('');
            setSnackBarOptions({
                isOpen: true,
                severity: 'success',
                message: 'Successfully updated username!',
                hash: username,
            });
            setUsernameLoading(false);
        } else {
            setUsernameError(true);
            setSnackBarOptions({
                isOpen: true,
                severity: 'error',
                message:
                    'Error updating username. Please check your network connection and try again.',
                hash: username,
            });
        }
    };

    const toggleAdultFlag = async () => {
        if (session) {
            setIsAdultLoading(true);
            const data = await setProfileAdultFlag(session.user.id, !isAdult);
            setProfile(data);
            setIsAdult(!isAdult);
            setSnackBarOptions({
                isOpen: true,
                severity: 'success',
                message: 'Successfully updated adult flag!',
                hash: String(isAdult),
            });
            setIsAdultLoading(false);
        }
    };

    const changeCountry = async () => {
        if (session && country && validateCountry(country)) {
            setCountryLoading(true);
            const data = await setProfileCountry(session.user.id, country);
            setProfile(data);
            setCountry('');
            setSnackBarOptions({
                isOpen: true,
                severity: 'success',
                message: 'Successfully updated country!',
                hash: country,
            });
            setCountryLoading(false);
        } else {
            setCountryError(true);
            setSnackBarOptions({
                isOpen: true,
                severity: 'error',
                message: country
                    ? 'Please select a valid country from the provided list.'
                    : 'Please select a country.',
                hash: country,
            });
        }
    };

    const DropDownItems: JSX.Element[] = useMemo(() => {
        // Sort countries alphabetically before displaying
        const sortedCountries = COUNTRIES.sort((a, b) => a.country.localeCompare(b.country));
        return sortedCountries.map((item, i) => (
            <MenuItem key={i} value={item.country}>
                {item.country}
            </MenuItem>
        ));
    }, [COUNTRIES]);

    return (
        <>
            <Button title='Edit Profile' StartIcon={Edit} onClick={handleOpen} />
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
                            xs: 300,
                            sm: 500,
                        },
                        boxShadow: 24,
                    }}
                >
                    <div className='flex flex-col items-center bg-background p-4 rounded-md'>
                        <Typ variant='h5'>Edit Profile</Typ>
                        <TextInput
                            name='username'
                            value={username}
                            label='Change Username'
                            color='secondary'
                            autoComplete='username'
                            error={usernameError}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            onFocus={() => setUsernameError(false)}
                            inputProps={{ minLength: 3 }}
                            sx={{ m: 0.5, width: 210 }}
                        />
                        <Typ>Current Username: {profile?.username}</Typ>
                        <Button
                            title='Change Username'
                            loading={usernameLoading}
                            StartIcon={Edit}
                            sx={{ width: 250, mb: 2 }}
                            onClick={changeUsername}
                        />
                        <FormControl sx={{ m: 0.5, width: 210 }} variant='filled'>
                            <InputLabel
                                htmlFor='country-input'
                                color='secondary'
                                className='text-text!'
                            >
                                Change Country
                            </InputLabel>
                            <Select
                                id='country-input'
                                name='country'
                                color='secondary'
                                className='text-text! text-left'
                                value={country}
                                error={countryError}
                                onChange={(e) => setCountry(e.target.value)}
                                onFocus={() => setCountryError(false)}
                                MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                                defaultValue={country}
                            >
                                {DropDownItems}
                            </Select>
                        </FormControl>
                        <Typ>Current Country: {profile?.country}</Typ>
                        <Button
                            title='Change Country'
                            loading={countryLoading}
                            StartIcon={Language}
                            sx={{ width: 250, mb: 2 }}
                            onClick={changeCountry}
                        />
                        <Typ>Adult Content: {profile?.adult ? 'visible' : 'not visible'}</Typ>
                        <Button
                            title='Toggle Adult Flag'
                            loading={isAdultLoading}
                            StartIcon={NoAdultContent}
                            sx={{ width: 250, mb: 2 }}
                            onClick={toggleAdultFlag}
                        />
                        <Button
                            title='Close'
                            color='error'
                            sx={{ minWidth: 100 }}
                            StartIcon={Close}
                            onClick={handleClose}
                        />
                    </div>
                </Box>
            </Modal>
            <Snackbar {...snackBarOptions} />
        </>
    );
};

export default EditProfileModal;
