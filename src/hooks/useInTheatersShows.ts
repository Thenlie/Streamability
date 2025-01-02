import { useEffect, useState } from 'react';
import { getMovieInTheaters } from '../helpers';
import { ShowData } from '../types';

/**
 * Custom hook that returns a list of in Theaters shows
 */
const useInTheatersShows = () => {
    const [inTheaters, setinTheaters] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            const movies = await getMovieInTheaters();
            const shows: ShowData[] = [];

            if (!movies) {
                setLoading(false);
                return;
            }

            if (movies) shows.push(...movies);

            setinTheaters(shows);
            setLoading(false);
        };
        handler();
    }, []);

    return { inTheatersShows: inTheaters, loading };
};

export default useInTheatersShows;
