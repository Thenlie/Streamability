import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

const useIsInFavorites = (showId: number) => {
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
