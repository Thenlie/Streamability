import React from 'react';
import Snackbar from './Snackbar';
import { useNetworkStatus } from '../hooks';

/**
 * Snackbar that displays when the user is not connected to the internet.
 * Is automatically removed when connection is re-established
 */
const OfflineSnackbar: React.FC = () => {
    const isOnline = useNetworkStatus();

    return (
        <Snackbar
            isOpen={!isOnline}
            isStatic
            severity='info'
            message='You appear to be offline. Please check your network connection to make the most of Streamability'
        />
    );
};

export default OfflineSnackbar;
