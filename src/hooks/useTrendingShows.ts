import { useEffect, useState } from 'react';
import {
    getMovieTrending,
    getTvTrending,
    sortShowsAlphaAsc,
    sortShowsByAvgRatingDesc,
    sortShowsByReleaseDateDesc,
} from '../helpers';
import { ShowData } from '../types';

/**
 * Custom hook that returns a list of trending shows
 * @param sortBy | Method to sort the shows, defaults to `rating`
 */
const useTrendingShows = (sortBy: 'rating' | 'release' | 'alpha' = 'rating') => {
    const [trending, setTrending] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            const movies = await getMovieTrending();
            const tv = await getTvTrending();
            const shows: ShowData[] = [];

            if (!movies && !tv) {
                setLoading(false);
                return;
            }

            if (!tv && movies) shows.push(...movies);
            else if (!movies && tv) shows.push(...tv);
            else if (movies && tv) shows.push(...movies, ...tv);

            switch (sortBy) {
                case 'rating':
                    setTrending(sortShowsByAvgRatingDesc(shows));
                    break;
                case 'release':
                    setTrending(sortShowsByReleaseDateDesc(shows));
                    break;
                case 'alpha':
                    // console.log(3, shows, sortShowsAlphaAsc(shows));
                    setTrending(sortShowsAlphaAsc(shows));
                    break;
            }
            setLoading(false);
        };
        handler();
    }, [sortBy]);
    return { trendingShows: trending, loading };
};

export default useTrendingShows;
