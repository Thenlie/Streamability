import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

const useIsInQueue = (showId: number) => {
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
