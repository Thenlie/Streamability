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
    visible: boolean;
    /**
     * The relative right position of the icon
     */
    position: number;
}

/**
 * Generic icon button. Does not contain any text, just an icon.
 */
const IconButton: React.FC<IconButtonProps> = ({ Icon, titleAccess, visible, position }) => {
    return (
        <>
            <Icon
                titleAccess={titleAccess}
                color='error'
                fontSize='large'
                className='bg-transprimary rounded-full p-[2px]'
                sx={{
                    display: visible ? 'block' : 'none',
                    position: 'relative',
                    top: 0,
                    right: position,
                    marginLeft: -4.4,
                    zIndex: 1,
                }}
            />
        </>
    );
};

export default IconButton;
