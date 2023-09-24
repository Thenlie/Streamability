import { SvgIconTypeMap } from '@mui/material';
import React from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface IconButtonProps {
    /**
     * Icon to be displayed as the button
     */
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string;
    };
    /**
     * Note to be shown when hovering the button and using screen reader
     */
    titleAccess: string;
    /**
     * Whether the button is visible or not
     */
    visible?: boolean;
    /**
     * The color of the button
     */
    color:
        | 'disabled'
        | 'action'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
}

/**
 * Generic icon button. Does not contain any text, just an icon.
 */
const IconButton: React.FC<IconButtonProps> = ({ Icon, titleAccess, visible = true, color }) => {
    return (
        <>
            <Icon
                titleAccess={titleAccess}
                color={color}
                fontSize='large'
                className='bg-transprimary rounded-full p-[2px]'
                sx={{
                    display: visible ? 'block' : 'none',
                }}
            />
        </>
    );
};

export default IconButton;
