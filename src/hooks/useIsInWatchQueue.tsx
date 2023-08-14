import { useEffect, useState } from 'react';
import { Profile } from '../types';

const useIsInWatchQueue = (showId: number, profile: Profile | null) => {
    const [isInWatchQueue, setIsInWatchQueue] = useState(false);

    useEffect(() => {
        const isInWatchQueue = profile?.watch_queue.includes(showId);
        setIsInWatchQueue(isInWatchQueue || false);
    }, [showId, profile]);

    return isInWatchQueue;
};

export default useIsInWatchQueue;
