import { useEffect, useState } from 'react';
import { Profile } from '../types';

/**
 * Custom hook that returns whether or not a give show
 * is in a users queue, favorites, or watched list.
 *
 * @param showId | TMDB id of the show
 * @param profile | User profile if logged in, otherwise `null`
 */
const useIsInProfileArray = (
    showId: number,
    profile: Profile | null
): {
    isInQueue: boolean;
    isInFavorites: boolean;
    isInWatched: boolean;
} => {
    const [isInQueue, setIsInQueue] = useState(false);
    const [isInFavorites, setIsInFavorites] = useState(false);
    const [isInWatched, setIsInWatched] = useState(false);

    useEffect(() => {
        const isInQueue =
            profile?.queue?.includes('movie-' + showId.toString()) ||
            profile?.queue?.includes('tv-' + showId.toString());
        setIsInQueue(isInQueue || false);

        const isInFavorites =
            profile?.favorites?.includes('movie-' + showId.toString()) ||
            profile?.favorites?.includes('tv-' + showId.toString());
        setIsInFavorites(isInFavorites || false);

        const isInWatched =
            profile?.watched?.includes('movie-' + showId.toString()) ||
            profile?.watched?.includes('tv-' + showId.toString());
        setIsInWatched(isInWatched || false);
    }, [showId, profile]);

    return {
        isInQueue,
        isInFavorites,
        isInWatched,
    };
};

export default useIsInProfileArray;
