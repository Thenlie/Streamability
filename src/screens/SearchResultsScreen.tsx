import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByName, getMovieDetails } from '../helpers/getMovieUtils';
import { ShowCard } from '../components';
import { MovieResults, ShowData, TvResults } from '../types';
import { getTvByName, getTvDetails } from '../helpers/getTvUtils';

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 *
 * @param request | HTTP GET request from the SearchInput component
 * @returns {Promise<string>} | the users query
 */
export async function loader({ request }: { request: Request }): Promise<string> {
    // get the query parameters from the URL
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.trim();
    if (!query) {
        throw new Response('Bad Request', { status: 400 });
    }
    return query as string;
}

/**
 * @returns {JSX.Element} results page after user input
 */
export default function SearchResultsScreen(): JSX.Element {
    const query: string = useLoaderData() as string;
    const [movieDetails, setMovieDetails] = useState<ShowData[]>([]);
    const [showDetails, setShowDetails] = useState<ShowData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Build array of show details, set to state once complete
        const handler = async () => {
            const movieData: MovieResults = await getMoviesByName(query);
            const showData: TvResults = await getTvByName(query);
            const movieArr = [];
            const showArr = [];
            for (let i = 0; i < movieData.results.length; i++) {
                const movie = await getMovieDetails(movieData.results[i].id);
                movieArr.push(movie);
            }
            if (showData.results) {
                for (let i = 0; i < showData.results.length; i++) {
                    const show = await getTvDetails(showData.results[i].id);
                    showArr.push(show);
                }
            }
            setMovieDetails(movieArr);
            setShowDetails(showArr);
            setLoading(false);
        };
        handler();
    }, [query]);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p data-testid='search-results-loader'>Loading...</p>;

    return (
        <>
            <h1 data-testid='search-results-heading'>Search Results Page</h1>
            <p>Query: {query}</p>
            <div className='flex flex-wrap justify-center'>
                {movieDetails.map((item, i) => item && <ShowCard key={i} details={item} />)}
                {showDetails.map((item, i) => item && <ShowCard key={i} details={item} />)}
            </div>
        </>
    );
}
