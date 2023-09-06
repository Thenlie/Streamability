import { Outlet } from 'react-router-dom';
import { useSessionContext } from '../hooks';
import React from 'react';

/**
 * Wrapper for all authentication components
 * LoginForm, SignupForm
 *
 * @returns {JSX.Element}
 */
const AuthScreen: React.FC = (): JSX.Element => {
    const { session } = useSessionContext();

    return (
        <>
            <Outlet context={{ session }} />
        </>
    );
};

export default AuthScreen;
