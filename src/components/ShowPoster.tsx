import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';

export const SHOW_POSTER_WIDTH = 180;

export interface ShowPosterProps {
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * Either 'movie' or 'tv'
     */
    showType: string;
    /**
     * Remove a single show from the users queue
     */
    removeFromQueue?: (showId: string) => Promise<void>;
}

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
const ShowPoster: React.FC<ShowPosterProps> = ({
    details,
    showType,
    removeFromQueue,
}): JSX.Element => {
    const [hover, setHover] = useState(false);

    const hoverHandler = (hovering: boolean) => {
        setHover(hovering);
    };

    return (
        <div
            onMouseEnter={() => hoverHandler(true)}
            onMouseLeave={() => hoverHandler(false)}
            data-testid='show-card-component'
            className='m-1 flex w-[180px] rounded-sm'
        >
            {removeFromQueue && (
                <Tooltip title='Remove from Queue' placement='right-start' className='mt-2'>
                    <div
                        onClick={() => removeFromQueue(details.media_type + '-' + details.id)}
                        className='cursor-pointer'
                    >
                        <Delete
                            titleAccess={`Remove ${details.title} from queue`}
                            color='error'
                            fontSize='large'
                            className='bg-transprimary rounded-full p-[2px]'
                            sx={{
                                display: hover ? 'block' : 'none',
                                position: 'relative',
                                top: 0,
                                right: -175,
                                marginLeft: -4.4,
                                zIndex: 1,
                            }}
                        />
                    </div>
                </Tooltip>
            )}
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-sm'
                    sx={{
                        width: 180,
                        minWidth: 180,
                        height: 270,
                        minHeight: 270,
                        boxShadow: 5,
                        '&:hover': { opacity: 0.8 },
                    }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={`${details.title} poster`}
                />
            </Link>
        </div>
    );
};

export default ShowPoster;
