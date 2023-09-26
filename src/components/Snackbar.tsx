import React, { useEffect, useState } from 'react';
import { Alert, Snackbar as SnackbarMUI } from '@mui/material';

export interface SnackbarProps {
    /**
     * If the snackbar is displayed or not
     */
    isOpen: boolean;
    /**
     * WiLl determine the color and icon of the snackbar
     */
    severity: 'success' | 'info' | 'warning' | 'error';
    /**
     * Text to display in the snackbar
     */
    message: string;
    /**
     * Value to re-trigger the snackbar on change
     */
    hash?: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ isOpen, severity, message, hash }) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen, severity, message, hash]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SnackbarMUI
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            className='w-full pr-12'
        >
            <Alert onClose={handleClose} severity={severity} className='w-full'>
                {message}
            </Alert>
        </SnackbarMUI>
    );
};
export default Snackbar;
