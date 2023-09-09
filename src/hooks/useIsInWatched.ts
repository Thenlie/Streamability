import { useEffect, useState } from 'react';
import { Profile } from '../types';

const useIsInWatched = (showId: number, profile: Profile | null) => {
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
