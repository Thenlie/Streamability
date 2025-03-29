import React, { ReactElement } from 'react';
import FormControlMUI from '@mui/material/FormControl';
import InputLabelMUI from '@mui/material/InputLabel';
import InputMUI from '@mui/material/Input';
import FilledInputMUI from '@mui/material/FilledInput';
import type { SxProps } from '@mui/system/styleFunctionSx';
import type { Theme } from '@mui/material';

interface TextInputProps {
    /**
     * HTML element id
     */
    id?: string;
    /**
     * HTML input element type, defaults to `text`
     */
    type?: 'text' | 'username' | 'email' | 'password' | 'search' | 'url';
    /**
     * HTML element name
     */
    name?: string;
    /**
     * Label to display in the input field
     */
    label: string;
    /**
     * HTML autocomplete attribute
     */
    autoComplete?: string;
    /**
     * Controls variant of MUI Input component, defaults to `filled`
     */
    variant?: 'filled' | 'outlined';
    /**
     * MUI color of button, defaults to `secondary`
     */
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    /**
     * Override the default text color
     */
    textOverrideColor?: 'white' | 'black';
    /**
     * Value of controlled input
     */
    value?: string;
    /**
     * If true, the input will indicate an error
     */
    error?: boolean;
    /**
     * If true, the input element is required
     */
    required?: boolean;
    /**
     * Function to be run when input value changes
     */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Function to set email error to false when input focused
     */
    onFocus?: () => void;
    /**
     * If the input should automatically focus when rendered
     */
    autoFocus?: boolean;
    /**
     * Icon to show in the input field
     */
    endAdornment?: ReactElement;
    /**
     * Provides an accessible label to the element
     */
    ariaLabel?: string;
    /**
     * Attributes applied to the input element
     */
    inputProps?: object;
    /**
     * MUI styling props to override default styling
     */
    sx?: SxProps<Theme>;
}

const TextInput: React.FC<TextInputProps> = ({
    id,
    type = 'text',
    name,
    label,
    autoComplete,
    variant = 'filled',
    color = 'primary',
    textOverrideColor,
    value,
    error,
    required,
    onChange,
    onFocus,
    autoFocus,
    endAdornment,
    ariaLabel,
    inputProps,
    sx,
}) => {
    const InputVariant = variant === 'filled' ? FilledInputMUI : InputMUI;

    const renderInput = (
        <>
            <InputVariant
                id={id}
                type={type}
                name={name}
                autoComplete={autoComplete}
                color={color}
                value={value}
                error={error}
                required={required}
                onChange={onChange}
                onFocus={onFocus}
                autoFocus={autoFocus}
                endAdornment={endAdornment}
                aria-label={ariaLabel}
                inputProps={{ ...inputProps }}
                sx={{
                    color: textOverrideColor,
                    borderBottomColor: textOverrideColor,
                    ':before': { borderBottomColor: textOverrideColor },
                    '&:not(.Mui-disabled):hover::before': { borderBottomColor: textOverrideColor },
                }}
            />
        </>
    );

    return (
        <FormControlMUI sx={{ m: 0.5, ...sx }} variant='filled'>
            <InputLabelMUI htmlFor={id ? id : name} color={color} sx={{ color: textOverrideColor }}>
                {label}
            </InputLabelMUI>
            {renderInput}
        </FormControlMUI>
    );
};

export default TextInput;
