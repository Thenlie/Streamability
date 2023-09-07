import React, { useState } from 'react';
import { ErrorMessage, SubmitButton } from '../../components';
import { SUPABASE } from '../../helpers';
import { useSessionContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { InputAdornment, FilledInput, InputLabel, FormControl, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logger from '../../logger';

const LOG = new Logger('SignupForm');

/**
 * Form to handle user sign up
 *
 * @returns {JSX.Element}
 */
const SignUpForm: React.FC = (): JSX.Element => {
    const { session } = useSessionContext();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // redirect users that are logged in
    if (session) {
        return <Navigate to={'/dashboard'} />;
    }

    // show error message for 3 seconds and then remove
    const showError = (msg: string): void => {
        setErrorMessage(msg);
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    // reset all error states
    const clearErrors = (): void => {
        setEmailError(false);
        setUsernameError(false);
        setPasswordError(false);
        setConfirmPasswordError(false);
        setErrorMessage('');
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
        setLoading(true);
        evt.preventDefault();
        clearErrors();

        // Ensure all fields have input
        if (!email) setEmailError(true);
        if (!username) setUsernameError(true);
        if (!password) setPasswordError(true);
        if (!confirmPassword) setConfirmPasswordError(true);
        if (!email || !password || !confirmPassword || !username) {
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

    return (
        <div aria-live='polite' className='flex flex-col flex-1 justify-center'>
            <h1 data-testid='signup-heading'>Signup</h1>
            <form onSubmit={signUpHandler} className='flex flex-col' data-testid='signup-form'>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='email-input' color='secondary' className='!text-text'>
                        Email
                    </InputLabel>
                    <FilledInput
                        id='email-input'
                        type='email'
                        name='email'
                        autoComplete='email'
                        color='secondary'
                        className='!text-text'
                        value={email}
                        error={emailError}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setEmailError(false)}
                    />
                </FormControl>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='username-input' color='secondary' className='!text-text'>
                        Username
                    </InputLabel>
                    <FilledInput
                        id='username-input'
                        type='username'
                        name='username'
                        color='secondary'
                        className='!text-text'
                        value={username}
                        error={usernameError}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setUsernameError(false)}
                    />
                </FormControl>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel htmlFor='password-input' color='secondary' className='!text-text'>
                        Password
                    </InputLabel>
                    <FilledInput
                        id='password-input'
                        name='password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        autoComplete='new-password'
                        color='secondary'
                        className='!text-text'
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
                </FormControl>
                <FormControl sx={{ m: 0.5 }} variant='filled'>
                    <InputLabel
                        htmlFor='confirm-password-input'
                        color='secondary'
                        className='!text-text'
                    >
                        Confirm Password
                    </InputLabel>
                    <FilledInput
                        id='confirm-password-input'
                        name='confirm-password'
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        error={confirmPasswordError}
                        color='secondary'
                        className='!text-text'
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
                </FormControl>
                <SubmitButton loading={loading} />
                {errorMessage && <ErrorMessage message={errorMessage} />}
            </form>
        </div>
    );
};

export default SignUpForm;
