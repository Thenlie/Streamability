import { Outlet } from 'react-router-dom';
import { useProfileContext, useSessionContext } from '../../hooks';
import React from 'react';
import { OfflineSnackbar } from '../../components';

/**
 * Wrapper for all dashboard screens
 * DashboardScreen, DashboardGalleryScreen
 */
const DashboardLayout: React.FC = () => {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();

    return (
        <>
            <Outlet context={{ session, setSession, profile, setProfile }} />
            <OfflineSnackbar />
        </>
    );
};

export default DashboardLayout;
