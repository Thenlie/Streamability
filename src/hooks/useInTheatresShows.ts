import { useEffect, useState } from 'react';
import { getMovieInTheatres } from '../helpers';
import { ShowData } from '../types';

/**
 * Custom hook that returns a list of in Theatres shows
 * @param sortBy | Method to sort the shows, defaults to `rating`
 */
const useInTheatresShows = () => {
    const [inTheatres, setinTheatres] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            const movies = await getMovieInTheatres();
            const shows: ShowData[] = [];

            if (!movies) {
                setLoading(false);
                return;
            }

            if (movies) shows.push(...movies);

            setinTheatres(shows);
            setLoading(false);
        };
        handler();
    }, []);

    return { inTheatresShows: inTheatres, loading };
};

export default useInTheatresShows;
