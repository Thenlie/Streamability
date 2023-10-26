import { Outlet } from 'react-router-dom';
import { useSessionContext } from '../../hooks';
import React from 'react';
import { OfflineSnackbar } from '../../components';

/**
 * Wrapper for all authentication components
 * LoginForm, SignUpForm
 */
const AuthLayout: React.FC = () => {
    const { session } = useSessionContext();

    return (
        <>
            <Outlet context={{ session }} />
            <OfflineSnackbar />
        </>
    );
};

export default AuthLayout;
