import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
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
            className='m-1 flex w-[180px] bg-foreground rounded-sm'
        >
            {removeFromQueue && (
                <div
                    onClick={() => removeFromQueue(details.media_type + '-' + details.id)}
                    className='cursor-pointer'
                >
                    <Delete
                        color='error'
                        fontSize='large'
                        sx={{
                            display: hover ? 'block' : 'none',
                            position: 'relative',
                            top: 5,
                            right: -180,
                            marginLeft: -4.4,
                        }}
                    />
                </div>
            )}
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-l-sm'
                    sx={{ width: 180, minWidth: 180, height: 270, minHeight: 270 }}
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
