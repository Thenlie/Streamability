import React from 'react';
import {
    Fade,
    SimplePaletteColorOptions,
    SvgIconTypeMap,
    SxProps,
    Theme,
    Tooltip,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import RotateRight from '@mui/icons-material/RotateRight';

interface IconButtonProps {
    /**
     * Icon displayed as the button
     */
    Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
        muiName: string;
    };
    /**
     * Text shown when hovering and using screen reader
     */
    titleAccess: string;
    /**
     * The color of the button.
     * `main` will be used for normal display, `dark` will be used on hover.
     */
    color: SimplePaletteColorOptions;
    /**
     * Text shown in the button tooltip
     */
    tooltip?: string;
    /**
     * If the tooltip should be shown, defaults to `true`
     */
    tooltipVisible?: boolean;
    /**
     * Displays the loading spinner when `true`, defaults to `false`
     */
    loading?: boolean;
    /**
     * Function run when button is clicked
     */
    onClick?: () => void;
    /**
     * Styles to override the defaults
     */
    sx?: SxProps<Theme>;
}

/**
 * Generic icon button. Does not contain any text, just an icon.
 * Can be conditionally wrapped in a tooltip to show text on hover.
 */
const IconButton: React.FC<IconButtonProps> = ({
    Icon,
    titleAccess,
    color,
    tooltip,
    tooltipVisible = true,
    loading = false,
    onClick,
    sx,
}) => {
    return (
        <Tooltip
            title={tooltipVisible ? tooltip : ''}
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 0 }}
        >
            {loading ? (
                <RotateRight
                    titleAccess={tooltipVisible ? '' : titleAccess}
                    color='secondary'
                    fontSize='large'
                    className='bg-transprimary rounded-full p-[2px] animate-spin'
                    sx={{
                        '&:hover': `${!loading && { opacity: 0.8 }}`,
                        margin: 0.2,
                        ...sx,
                    }}
                />
            ) : (
                <div onClick={onClick} className='cursor-pointer'>
                    <Icon
                        titleAccess={tooltipVisible ? '' : titleAccess}
                        fontSize='large'
                        className='bg-transprimary rounded-full p-[2px]'
                        sx={{
                            color: color.main,
                            '&:hover': { color: color.dark },
                            margin: 0.2,
                            ...sx,
                        }}
                    />
                </div>
            )}
        </Tooltip>
    );
};

export default IconButton;
