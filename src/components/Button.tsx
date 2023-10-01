import React from 'react';
import { Button as ButtonMUI, SvgIconTypeMap, SxProps, Theme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface ButtonProps {
    /**
     * Text to be rendered in the button
     */
    title: string;
    /**
     * Type of button, defaults to `button`
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * MUI color of button, defaults to `secondary`
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /**
     * Displays loading spinner when `true`, defaults to `false`
     */
    loading?: boolean;
    /**
     * If the button is clickable, defaults to `false`
     */
    disabled?: boolean;
    /**
     * Icon displayed in front of button text
     */
    StartIcon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string;
    };
    /**
     * Function to be run when button is clicked
     */
    onClick?: () => void;
    /**
     * MUI styling props to override default styling
     */
    sx?: SxProps<Theme>;
}

/**
 * Generic form submission button
 */
const Button: React.FC<ButtonProps> = ({
    title,
    type = 'button',
    color = 'primary',
    loading = false,
    disabled = false,
    StartIcon,
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
                startIcon={!loading && StartIcon && <StartIcon />}
                onClick={onClick}
                sx={{ margin: 0.5, minWidth: 210, minHeight: 45, ...sx }}
            >
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : title}
            </ButtonMUI>
        </>
    );
};

export default Button;
