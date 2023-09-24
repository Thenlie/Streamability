import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

/**
 * Custom hook that returns whether or not a give show
 * is in a users favorites.
 * @param showId | TMDB id of the show
 * @returns {boolean}
 */
const useIsInFavorites = (showId: number): boolean => {
    const { profile } = useProfileContext();
    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        const isInFavorites =
            profile?.favorites?.includes('movie-' + showId.toString()) ||
            profile?.favorites?.includes('tv-' + showId.toString());
        setIsInFavorites(isInFavorites || false);
    }, [showId, profile]);

    return isInFavorites;
};

export default useIsInFavorites;
