import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import React from 'react';

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
}

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
const ShowPoster: React.FC<ShowPosterProps> = ({ details, showType }): JSX.Element => {
    return (
        <div
            data-testid='show-card-component'
            className='m-1 flex w-[180px] bg-foreground rounded-sm'
        >
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
