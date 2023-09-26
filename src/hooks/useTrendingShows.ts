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

    useEffect(() => {
        const handler = async () => {
            const movies = await getMovieTrending();
            const tv = await getTvTrending();
            const shows: ShowData[] = [];

            if (!movies && !tv) return;

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
                    setTrending(sortShowsAlphaAsc(shows));
                    break;
            }
        };
        handler();
    }, [sortBy]);

    return trending;
};

export default useTrendingShows;
