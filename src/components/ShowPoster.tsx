import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { CardMedia } from '@mui/material';
import React, { useState } from 'react';
import {
    AddToQueue,
    Cancel,
    CheckCircle,
    Delete,
    Favorite,
    HeartBroken,
} from '@mui/icons-material';
import { ProfileActions } from '../types';
import { useIsInFavorites, useIsInQueue, useIsInWatched } from '../hooks';
import IconButton from './IconButton';

export const SHOW_POSTER_WIDTH = 180;
const ICON_WIDTH = 40;
const ICON_POS = -175;

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
    profileActions,
    showQueueButton = false,
    showFavoritesButton = false,
    showWatchedButton = false,
}) => {
    const isInQueue = useIsInQueue(details.id);
    const isInFavorites = useIsInFavorites(details.id);
    const isInWatched = useIsInWatched(details.id);
    const dbShowId = details.media_type + '-' + details.id;

    const calcIconThreePos = (): number => {
        if (showQueueButton && showFavoritesButton) return ICON_POS + ICON_WIDTH * 2;
        else if (showQueueButton || showFavoritesButton) return ICON_POS + ICON_WIDTH;
        else return ICON_POS;
    };

    const icon_two_pos = showQueueButton ? ICON_POS + ICON_WIDTH : ICON_POS;
    const icon_three_pos = calcIconThreePos();

    if (!profileActions) return <></>;

    return (
        <>
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
                            position={ICON_POS}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={AddToQueue}
                            titleAccess={`Add ${details.title} to queue`}
                            visible={visible}
                            position={ICON_POS}
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
                            position={icon_two_pos}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={Favorite}
                            titleAccess={`Add ${details.title} to favorites`}
                            visible={visible}
                            position={icon_two_pos}
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
                            position={icon_three_pos}
                            color='error'
                        />
                    ) : (
                        <IconButton
                            Icon={CheckCircle}
                            titleAccess={`Add ${details.title} to watched`}
                            visible={visible}
                            position={icon_three_pos}
                            color='success'
                        />
                    )}
                </div>
            )}
        </>
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
