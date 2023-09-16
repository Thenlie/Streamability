import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { CheckCircle, Delete, Favorite } from '@mui/icons-material';
import { ProfileActions } from '../hooks/useProfileActions';

export const SHOW_POSTER_WIDTH = 180;

export interface ShowPosterButtonProps {
    /**
     * If buttons are visible
     */
    visible: boolean;
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * Functions to alter profile arrays
     */
    profileActions?: ProfileActions;
    /**
     * If the queue button should be visible
     */
    showQueueButton?: boolean;
    /**
     * If the favorites button should be visible
     */
    showFavoritesButton?: boolean;
    /**
     * If the watched button should be visible
     */
    showWatchedButton?: boolean;
}

export const ShowPosterButtons: React.FC<ShowPosterButtonProps> = ({
    visible,
    details,
    profileActions,
    showQueueButton = false,
    showFavoritesButton = false,
    showWatchedButton = false,
}) => {
    if (!profileActions) return <></>;

    return (
        <>
            {showQueueButton && (
                <Tooltip title='Remove from Queue' placement='right-start' className='mt-2'>
                    <div
                        onClick={() =>
                            profileActions.removeFromQueue(details.media_type + '-' + details.id)
                        }
                        className='cursor-pointer'
                    >
                        <Delete
                            titleAccess={`Remove ${details.title} from queue`}
                            color='error'
                            fontSize='large'
                            className='bg-transprimary rounded-full p-[2px]'
                            sx={{
                                display: visible ? 'block' : 'none',
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
            {showFavoritesButton && (
                <Tooltip title='Add to Favorites' placement='right-start' className='mt-2'>
                    <div
                        onClick={() =>
                            profileActions.removeFromFavorites(
                                details.media_type + '-' + details.id
                            )
                        }
                        className='cursor-pointer'
                    >
                        <Favorite
                            titleAccess={`Add ${details.title} to favorites`}
                            color='error'
                            fontSize='large'
                            className='bg-transprimary rounded-full p-[2px]'
                            sx={{
                                display: visible ? 'block' : 'none',
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
            {showWatchedButton && (
                <Tooltip title='Mark as Watched' placement='right-start' className='mt-2'>
                    <div
                        onClick={() =>
                            profileActions.removeFromWatched(details.media_type + '-' + details.id)
                        }
                        className='cursor-pointer'
                    >
                        <CheckCircle
                            titleAccess={`Mark ${details.title} as watched`}
                            color='success'
                            fontSize='large'
                            className='bg-transprimary rounded-full p-[2px]'
                            sx={{
                                display: visible ? 'block' : 'none',
                                position: 'relative',
                                top: 0,
                                right: -135,
                                marginLeft: -4.4,
                                zIndex: 1,
                            }}
                        />
                    </div>
                </Tooltip>
            )}
        </>
    );
};

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
     * Functions to alter profile arrays
     */
    profileActions?: ProfileActions;
    /**
     * If the queue button should be visible
     */
    showQueueButton?: boolean;
    /**
     * If the favorites button should be visible
     */
    showFavoritesButton?: boolean;
    /**
     * If the watched button should be visible
     */
    showWatchedButton?: boolean;
}

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @todo Make button positioning conditional for 1, 2 or 3 icons
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
const ShowPoster: React.FC<ShowPosterProps> = ({ details, showType, ...rest }): JSX.Element => {
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
            <ShowPosterButtons visible={hover} details={details} {...rest} />
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
