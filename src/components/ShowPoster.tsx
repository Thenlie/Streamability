import { Profile, ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    AddToQueue,
    Cancel,
    CheckCircle,
    Delete,
    Favorite,
    HeartBroken,
} from '@mui/icons-material';
import { ProfileActions } from '../types';
import { useIsInProfileArray } from '../hooks';
import IconButton from './IconButton';

export const SHOW_POSTER_WIDTH = 180;

interface ShowPosterButtonProps {
    /**
     * If buttons are visible
     */
    visible: boolean;
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * User profile if logged in, otherwise `null`
     */
    profile?: Profile | null;
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
 * Buttons that perform profile actions such as adding to
 * or removing from the profile arrays.
 */
const ShowPosterButtons: React.FC<ShowPosterButtonProps> = ({
    visible,
    details,
    profile,
    profileActions,
    showQueueButton = false,
    showFavoritesButton = false,
    showWatchedButton = false,
}) => {
    const [numOfIcons, setNumOfIcons] = useState(0);
    const { isInQueue, isInFavorites, isInWatched } = useIsInProfileArray(
        details.id,
        profile || null
    );
    const dbShowId = details.media_type + '-' + details.id;

    if (!profile || !profileActions) return;

    useEffect(() => {
        let num = 0;
        if (showQueueButton) num++;
        if (showFavoritesButton) num++;
        if (showWatchedButton) num++;
        setNumOfIcons(num);
    }, [showQueueButton, showFavoritesButton, showWatchedButton]);

    return (
        <div
            id='button-container'
            className={`absolute flex z-10 m-2 ${numOfIcons === 1 && 'ml-[140px]'} ${
                numOfIcons === 2 && 'ml-[105px]'
            } ${numOfIcons === 3 && 'ml-[70px]'}`}
        >
            {showQueueButton && (
                <div
                    onClick={() =>
                        isInQueue
                            ? profileActions.removeFromQueue(dbShowId)
                            : profileActions.addToQueue(dbShowId)
                    }
                    className='cursor-pointer'
                >
                    {isInQueue ? (
                        <IconButton
                            Icon={Delete}
                            titleAccess={`Remove ${details.title} from queue`}
                            visible={visible}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={AddToQueue}
                            titleAccess={`Add ${details.title} to queue`}
                            visible={visible}
                            color='success'
                        />
                    )}
                </div>
            )}
            {showFavoritesButton && (
                <div
                    onClick={() =>
                        isInFavorites
                            ? profileActions.removeFromFavorites(dbShowId)
                            : profileActions.addToFavorites(dbShowId)
                    }
                    className='cursor-pointer'
                >
                    {isInFavorites ? (
                        <IconButton
                            Icon={HeartBroken}
                            titleAccess={`Remove ${details.title} from favorites`}
                            visible={visible}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={Favorite}
                            titleAccess={`Add ${details.title} to favorites`}
                            visible={visible}
                            color='error'
                        />
                    )}
                </div>
            )}
            {showWatchedButton && (
                <div
                    onClick={() =>
                        isInWatched
                            ? profileActions.removeFromWatched(dbShowId)
                            : profileActions.addToWatched(dbShowId)
                    }
                    className='cursor-pointer'
                >
                    {isInWatched ? (
                        <IconButton
                            Icon={Cancel}
                            titleAccess={`Remove ${details.title} from watched`}
                            visible={visible}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={CheckCircle}
                            titleAccess={`Add ${details.title} to watched`}
                            visible={visible}
                            color='success'
                        />
                    )}
                </div>
            )}
        </div>
    );
};

interface ShowPosterProps {
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * Either 'movie' or 'tv'
     */
    showType: string;
    /**
     * User profile if logged in, otherwise `null`
     */
    profile: Profile | null;
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
 * A show card that only shows the poster image, no text or other content.
 * Used in the Show Carousel.
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
