import { useEffect, useState } from 'react';
import { useProfileContext } from './context';

const useIsInWatched = (showId: number) => {
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
