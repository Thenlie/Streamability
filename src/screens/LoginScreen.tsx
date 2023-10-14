import React, { useState } from 'react';
import { Button, Snackbar, TextInput } from '../components';
import { SUPABASE } from '../helpers';
import { useSessionContext } from '../hooks';
import { Link, Navigate } from 'react-router-dom';
import { InputAdornment, IconButton, Typography as Typ } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logger from '../logger';
import { SnackbarProps } from '../components/Snackbar';

const LOG = new Logger('LoginForm');

/**
 * Form to handle user login.
 * Will redirect to dashboard if already logged in
 * or upon login completion.
 */
const LoginScreen: React.FC = () => {
    const { session } = useSessionContext();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackBarOptions, setSnackBarOptions] = useState<SnackbarProps>({
        isOpen: false,
        severity: 'success',
        message: '',
    });

    if (session) {
        return <Navigate to={'/dashboard'} replace />;
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
            // TODO: We could try to get the AuthApiError type and use 'cause' instead
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
            <Typ data-testid='login-heading' variant='h4' sx={{ margin: 2 }}>
                Login
            </Typ>
            <form onSubmit={signInWithEmail} className='flex flex-col' data-testid='login-form'>
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
                                onClick={() => setIsPasswordVisible((prev) => !prev)}
                                edge='end'
                            >
                                {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Button title='Submit' type='submit' loading={loading} />
            </form>
            <div className='mt-2'>
                <Typ display='inline'>Don&apos;t have an account? </Typ>
                <Link to='/auth/signup' className='underline hover:text-blue-500'>
                    Sign up.
                </Link>
            </div>
            <Snackbar {...snackBarOptions} />
        </div>
    );
};

export default LoginScreen;
