import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import SnackbarMUI from '@mui/material/Snackbar';

export interface SnackbarProps {
    /**
     * If the snackbar is displayed
     */
    isOpen: boolean;
    /**
     * Determines the color and icon of the snackbar
     */
    severity: 'success' | 'info' | 'warning' | 'error';
    /**
     * Text displayed in the snackbar
     */
    message: string;
    /**
     * Value to re-trigger the snackbar on change.
     * This is needed when all other props are the same
     * but you want to re-render the component
     */
    hash?: string;
    /**
     * When `true`, snackbar will not disappear automatically.
     * Defaults to `false`
     */
    isStatic?: boolean;
    /**
     * Positioning of the snackbar, defaults to `bottom-center`
     */
    position?: { vertical: 'top' | 'bottom'; horizontal: 'center' | 'left' | 'right' };
}

const Snackbar: React.FC<SnackbarProps> = ({
    isOpen,
    severity,
    message,
    hash,
    isStatic = false,
    position = { vertical: 'bottom', horizontal: 'center' },
}) => {
    const [open, setOpen] = useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen, severity, message, hash, isStatic]);

    const handleClose = () => {
        if (isStatic && isOpen) return;
        setOpen(false);
    };

    const handleCloseClick = () => {
        setOpen(false);
    };

    return (
        <SnackbarMUI
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            className='w-full'
            anchorOrigin={{ vertical: position.vertical, horizontal: position.horizontal }}
        >
            <Alert onClose={handleCloseClick} severity={severity} className='w-3/4'>
                {message}
            </Alert>
        </SnackbarMUI>
    );
};
export default Snackbar;
