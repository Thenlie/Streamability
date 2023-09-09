import { useEffect, useState } from 'react';
import { Profile } from '../types';

const useIsInFavorites = (showId: number, profile: Profile | null) => {
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
