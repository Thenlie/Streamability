import { Outlet } from 'react-router-dom';
import { useSessionContext } from '../hooks';
import React from 'react';

/**
 * Wrapper for all authentication components
 * LoginForm, SignUpForm
 *
 * @returns {JSX.Element}
 */
const AuthLayout: React.FC = (): JSX.Element => {
    const { session } = useSessionContext();

    return (
        <>
            <Outlet context={{ session }} />
        </>
    );
};

export default AuthLayout;
