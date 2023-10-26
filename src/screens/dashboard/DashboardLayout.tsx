import { Outlet } from 'react-router-dom';
import { useNetworkStatus, useProfileContext, useSessionContext } from '../../hooks';
import React from 'react';
import { Snackbar } from '../../components';

/**
 * Wrapper for all dashboard screens
 * DashboardScreen, DashboardGalleryScreen
 */
const DashboardLayout: React.FC = () => {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const isOnline = useNetworkStatus();

    return (
        <>
            <Outlet context={{ session, setSession, profile, setProfile }} />
            <Snackbar
                isOpen={!isOnline}
                isStatic
                severity='info'
                message='You appear to be offline. Please check your network connection to make the most of Streamability'
            />
        </>
    );
};

export default DashboardLayout;
