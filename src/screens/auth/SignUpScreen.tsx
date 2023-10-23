import React, { useState, useMemo } from 'react';
import { Button, Snackbar, TextInput } from '../../components';
import { SUPABASE } from '../../supabase/supabaseClient';
import { COUNTRIES, validateCountry } from '../../helpers';
import { useSessionContext } from '../../hooks';
import { Link, Navigate } from 'react-router-dom';
import {
    InputAdornment,
    InputLabel,
    FormControl,
    IconButton,
    Select,
    MenuItem,
    Typography as Typ,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logger from '../../logger';
import { SnackbarProps } from '../../components/Snackbar';

const LOG = new Logger('SignUpForm');

/**
 * Form to handle user sign up.
 * Wil redirect to dashboard if already logged in
 * or upon sign up completion.
 */
const SignUpScreen: React.FC = () => {
    const { session } = useSessionContext();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [country, setCountry] = useState('United States of America');
    const [countryError, setCountryError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackBarOptions, setSnackBarOptions] = useState<SnackbarProps>({
        isOpen: false,
        severity: 'success',
        message: '',
    });

    // redirect users that are logged in
    if (session) {
        return <Navigate to={'/dashboard'} />;
    }

    // show error message for 3 seconds and then remove
    const showError = (msg: string): void => {
        setSnackBarOptions({
            isOpen: true,
            severity: 'error',
            message: msg,
            hash: String(Math.random()),
        });
    };

    // reset all error states
    const clearErrors = (): void => {
        setEmailError(false);
        setUsernameError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
    };

    /**
     * Toggle whether password is displayed as dots or plaintext
     *
     * @param isConfirm | true if confirm password, false if password
     */
    const togglePasswordVisibility = (isConfirm: boolean): void => {
        isConfirm
            ? setIsConfirmPasswordVisible((prev) => !prev)
            : setIsPasswordVisible((prev) => !prev);
    };

    /**
     * Function to authenticate and perform Supabase sign up
     * This will not log the user in, it will send the user an email with a link
     * Once they click that link they will be logged in
     *
     * @param evt | DOM submit event
     * @returns {Promise<void>} | Does not redirect user
     */
    const signUpHandler = async (evt: React.SyntheticEvent): Promise<void> => {
        if (!SUPABASE) {
            LOG.error('Supabase client not found!');
            return;
        }
        setLoading(true);
        evt.preventDefault();
        clearErrors();

        // Ensure all fields have input
        if (!email) setEmailError(true);
        if (!username) setUsernameError(true);
        if (!password) setPasswordError(true);
        if (!confirmPassword) setConfirmPasswordError(true);
        if (!country) setCountryError(true);
        if (!email || !password || !confirmPassword || !username || !country) {
            showError('All fields must be filled out');
            setLoading(false);
            return;
        }

        // Ensure email is valid
        if (!email.match(/^(\w+|\d+)@(\w+|\d+)\.(\w+|\d+)/gm)) {
            showError('Must provide valid email');
            if (!email) setEmailError(true);
            setLoading(false);
            return;
        }

        // Ensure country is valid
        if (!validateCountry(country)) {
            showError('Must select a valid country');
            setCountryError(true);
            setLoading(false);
            return;
        }

        // Ensure password is of sufficient length
        if (password.length < 3) {
            showError('Password must be at least 6 characters');
            setPasswordError(true);
            setLoading(false);
            return;
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            setPasswordError(true);
            setConfirmPasswordError(true);
            showError('Passwords must match');
            setLoading(false);
            return;
        }

        // Perform Supabase sign up POST request
        const { error } = await SUPABASE.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username,
                    country: country,
                },
            },
        });

        if (error) {
            if (
                error.message ==
                'duplicate key value violates unique constraint "profiles_username_key"'
            ) {
                showError('Username unavailable');
                setUsernameError(true);
                setLoading(false);
                return;
            }
            showError(error.message);
            LOG.error(error);
            setLoading(false);
            return;
        }

        /**
         * After return a session will be created,
         * redirecting the user to their dashboard
         */
        return;
    };

    const DropDownItems: JSX.Element[] = useMemo(() => {
        return COUNTRIES.map((item, i) => (
            <MenuItem key={i} value={item.country}>
                {item.country}
            </MenuItem>
        ));
    }, [COUNTRIES]);

    return (
        <div aria-live='polite' className='flex flex-col flex-1 justify-center'>
            <Typ data-testid='signup-heading' variant='h4' sx={{ margin: 2 }}>
                Sign Up
            </Typ>
            <form onSubmit={signUpHandler} className='flex flex-col' data-testid='signup-form'>
                <TextInput
                    id='email-input'
                    type='email'
                    name='email'
                    label='Email'
                    color='secondary'
                    autoComplete='email'
                    value={email}
                    error={emailError}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailError(false)}
                />
                <TextInput
                    id='username-input'
                    type='username'
                    name='username'
                    label='Username'
                    color='secondary'
                    value={username}
                    error={usernameError}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUsernameError(false)}
                />
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='country-input' color='primary' className='!text-text'>
                        Country
                    </InputLabel>
                    <Select
                        id='country-input'
                        name='country'
                        color='primary'
                        className='!text-text text-left'
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
                <TextInput
                    id='password-input'
                    name='password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    label='Password'
                    color='secondary'
                    autoComplete='new-password'
                    value={password}
                    error={passwordError}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordError(false)}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle password visibility'
                                onClick={() => togglePasswordVisibility(false)}
                                edge='end'
                                sx={{ backgroundColor: 'none' }}
                            >
                                {isPasswordVisible ? (
                                    <VisibilityOff className='!text-text' />
                                ) : (
                                    <Visibility className='!text-text' />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <TextInput
                    id='confirm-password-input'
                    name='confirm-password'
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    label='Confirm Password'
                    color='secondary'
                    value={confirmPassword}
                    error={confirmPasswordError}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setConfirmPasswordError(false)}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton
                                aria-label='toggle confirm password visibility'
                                onClick={() => togglePasswordVisibility(true)}
                                edge='end'
                            >
                                {isConfirmPasswordVisible ? (
                                    <VisibilityOff className='!text-text' />
                                ) : (
                                    <Visibility className='!text-text' />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Button title='Submit' type='submit' loading={loading} />
            </form>
            <div className='mt-2'>
                <Typ display='inline'>Already have an account? </Typ>
                <Link to='/login' className='underline hover:text-blue-500'>
                    Login.
                </Link>
            </div>
            <Snackbar {...snackBarOptions} />
        </div>
    );
};

export default SignUpScreen;
