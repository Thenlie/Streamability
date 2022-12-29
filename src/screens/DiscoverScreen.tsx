import { useState, useEffect } from 'react';
import { getTrending, getMovieDetails } from '../helpers/getMovieUtils';
import { MovieDetailsData, MovieData } from '../types/tmdb';
import { ShowCard } from '../components';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const [trending, setTrending] = useState<MovieDetailsData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const handler = async () => {
            const movieData: MovieData = await getTrending();
            const movieArr = [];
            for (let i = 0; i < movieData.results.length; i++) {
                const movie = await getMovieDetails(movieData.results[i].id);
                movieArr.push(movie);
            }
            setTrending(movieArr);
            setLoading(false);
        };
        handler();
    }, []);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return <div>{trending.map((item, i) => item && <ShowCard key={i} details={item} />)}</div>;
}
