import React from 'react';
import { Button as ButtonMUI, SxProps, Theme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface ButtonProps {
    /**
     * Text to be rendered in the button
     */
    title: string;
    /**
     * Type of button
     */
    type: 'button' | 'submit' | 'reset';
    /**
     * MUI color of button
     */
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /**
     * Displays loading spinner when true, defaults to false
     */
    loading?: boolean;
    /**
     * If the button is clickable, false by default
     */
    disabled?: boolean;
    /**
     * Icon displayed in front of button text
     */
    startIcon?: React.ReactNode;
    /**
     * Function to be run when button is clicked
     */
    onClick?: () => void;
    /**
     * Styling props to override default styling
     */
    sx?: SxProps<Theme>;
}

/**
 * Generic form submission button
 */
const Button: React.FC<ButtonProps> = ({
    title,
    type,
    color,
    loading = false,
    disabled = false,
    startIcon,
    onClick,
    sx,
}) => {
    return (
        <>
            <ButtonMUI
                variant='contained'
                size='large'
                type={type}
                color={color}
                disabled={disabled || loading}
                startIcon={startIcon}
                onClick={onClick}
                sx={{ margin: 0.5, minWidth: 210, minHeight: 45, ...sx }}
            >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : title}
            </ButtonMUI>
        </>
    );
};

export default Button;
