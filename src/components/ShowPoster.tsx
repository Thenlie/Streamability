import { Profile, ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
    AddToQueue,
    Cancel,
    CheckCircle,
    Favorite,
    HeartBroken,
    RemoveFromQueue,
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

    // Get number of visible icons
    useEffect(() => {
        let n = 0;
        if (showQueueButton) n++;
        if (showFavoritesButton) n++;
        if (showWatchedButton) n++;
        setNumOfIcons(n);
    }, [showQueueButton, showFavoritesButton, showWatchedButton]);

    const queueCallback = useCallback(() => {
        isInQueue
            ? profileActions?.removeFromQueue(dbShowId)
            : profileActions?.addToQueue(dbShowId);
    }, [isInQueue]);

    const favoritesCallback = useCallback(() => {
        isInFavorites
            ? profileActions?.removeFromFavorites(dbShowId)
            : profileActions?.addToFavorites(dbShowId);
    }, [isInFavorites]);

    const watchedCallback = useCallback(() => {
        isInWatched
            ? profileActions?.removeFromWatched(dbShowId)
            : profileActions?.addToWatched(dbShowId);
    }, [isInWatched]);

    if (!profile || !profileActions || numOfIcons === 0) return;

    const { queueLoading, favoritesLoading, watchedLoading } = profileActions;

    return (
        <div
            id='button-container'
            className={`absolute z-10 m-2
                ${visible ? 'flex' : 'hidden'}
                ${numOfIcons === 1 && 'ml-[137px]'}
                ${numOfIcons === 2 && 'ml-[100px]'}
                ${numOfIcons === 3 && 'ml-[62px]'}`}
        >
            {showQueueButton && (
                <IconButton
                    Icon={isInQueue ? RemoveFromQueue : AddToQueue}
                    titleAccess={
                        isInQueue
                            ? `Remove ${details.title} from queue`
                            : `Add ${details.title} to queue`
                    }
                    color={isInQueue ? 'error' : 'success'}
                    tooltip={isInQueue ? 'Remove from queue' : 'Add to queue'}
                    onClick={queueCallback}
                    loading={queueLoading}
                />
            )}
            {showFavoritesButton && (
                <IconButton
                    Icon={isInFavorites ? HeartBroken : Favorite}
                    titleAccess={
                        isInFavorites
                            ? `Remove ${details.title} from favorites`
                            : `Add ${details.title} to favorites`
                    }
                    color='error'
                    tooltip={isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={favoritesCallback}
                    loading={favoritesLoading}
                />
            )}
            {showWatchedButton && (
                <IconButton
                    Icon={isInWatched ? Cancel : CheckCircle}
                    titleAccess={
                        isInWatched
                            ? `Remove ${details.title} from watched`
                            : `Add ${details.title} to watched`
                    }
                    color={isInWatched ? 'error' : 'success'}
                    tooltip={isInWatched ? 'Remove from watched' : 'Add to watched'}
                    onClick={watchedCallback}
                    loading={watchedLoading}
                />
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
const ShowPoster: React.FC<ShowPosterProps> = ({ details, ...rest }): JSX.Element => {
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
                to={`/details/${details.media_type}/${details.id}`}
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
