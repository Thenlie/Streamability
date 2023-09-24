import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

/**
 * Custom hook that returns whether or not a give show
 * is in a users watched list.
 * @param showId | TMDB id of the show
 * @returns {boolean}
 */
const useIsInWatched = (showId: number): boolean => {
    const { profile } = useProfileContext();
    const [isInWatched, setIsInWatched] = useState(false);

    useEffect(() => {
        const isInWatched =
            profile?.watched?.includes('movie-' + showId.toString()) ||
            profile?.watched?.includes('tv-' + showId.toString());
        setIsInWatched(isInWatched || false);
    }, [showId, profile]);

    return isInWatched;
};

export default useIsInWatched;
