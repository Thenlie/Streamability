import React, { useState } from 'react';
import { ErrorMessage, Button } from '../../components';
import { SUPABASE } from '../../helpers';
import { useSessionContext } from '../../hooks';
import { Navigate } from 'react-router-dom';
import { InputAdornment, FilledInput, InputLabel, FormControl, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logger from '../../logger';

const LOG = new Logger('LoginForm');

/**
 * Form to handle user login.
 *
 * @returns {JSX.Element}
 */
const LoginForm: React.FC = (): JSX.Element => {
    const { session } = useSessionContext();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

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

    /**
     * Function to authenticate and perform Supabase login
     * Once the user has logged in,
     * their user info and session is stored in the context
     *
     * @param evt | DOM submit event
     * @returns {Promise<void>} | Does not redirect user
     */
    async function signInWithEmail(evt: React.SyntheticEvent): Promise<void> {
        setLoading(true);
        evt.preventDefault();

        // Ensure both fields have input
        if (!email || !password) {
            showError('All fields must be filled out');
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
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

        // Perform Supabase login request
        const { error } = await SUPABASE.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // We could try to get the AuthApiError type and use 'cause' instead
            showError(error.message);
            LOG.error(error);
            setLoading(false);
            return;
        }

        // onAuthStateChange function will be triggered
        return;
    }

    return (
        <div aria-live='polite' className='flex flex-col flex-1 justify-center'>
            <h1 data-testid='login-heading'>Login</h1>
            <form onSubmit={signInWithEmail} className='flex flex-col' data-testid='login-form'>
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
                    <InputLabel htmlFor='password-input' color='secondary' className='!text-text'>
                        Password
                    </InputLabel>
                    <FilledInput
                        id='password-input'
                        name='password'
                        type={isPasswordVisible ? 'text' : 'password'}
                        autoComplete='new-password'
                        value={password}
                        error={passwordError}
                        color='secondary'
                        className='!text-text'
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setPasswordError(false)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                                    edge='end'
                                >
                                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Button title='Submit' type='submit' loading={loading} color='secondary' />
                {errorMessage.length > 0 && <ErrorMessage message={errorMessage} />}
            </form>
        </div>
    );
};

export default LoginForm;
