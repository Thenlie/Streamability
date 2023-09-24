import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

/**
 * Custom hook that returns whether or not a give show
 * is in a users queue.
 * @param showId | TMDB id of the show
 * @returns {boolean}
 */
const useIsInQueue = (showId: number): boolean => {
    const { profile } = useProfileContext();
    const [isInQueue, setIsInQueue] = useState(false);

    useEffect(() => {
        const isInQueue =
            profile?.queue?.includes('movie-' + showId.toString()) ||
            profile?.queue?.includes('tv-' + showId.toString());
        setIsInQueue(isInQueue || false);
    }, [showId, profile]);

    return isInQueue;
};

export default useIsInQueue;
