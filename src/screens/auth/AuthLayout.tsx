import { Outlet } from 'react-router-dom';
import { useNetworkStatus, useSessionContext } from '../../hooks';
import React from 'react';
import { Snackbar } from '../../components';

/**
 * Wrapper for all authentication components
 * LoginForm, SignUpForm
 */
const AuthLayout: React.FC = () => {
    const { session } = useSessionContext();
    const isOnline = useNetworkStatus();

    return (
        <>
            <Outlet context={{ session }} />
            <Snackbar
                isOpen={!isOnline}
                isStatic
                severity='info'
                message='You appear to be offline. Please check your network connection to make the most of Streamability'
            />
        </>
    );
};

export default AuthLayout;
