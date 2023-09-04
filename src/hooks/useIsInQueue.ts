import { useEffect, useState } from 'react';
import { Profile } from '../types';

const useIsInQueue = (showId: number, profile: Profile | null) => {
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
