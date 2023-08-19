import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByName } from '../helpers/getMovieUtils';
import { ShowCard } from '../components';
import { ShowData } from '../types';
import { getTvByName } from '../helpers/getTvUtils';
import ShowCardPlaceholder from '../components/ShowCardPlaceholder';
import { useProfileContext } from '../hooks';

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
    const { profile, setProfile } = useProfileContext();
    const [movieDetails, setMovieDetails] = useState<ShowData[] | null>(null);
    const [tvDetails, setTvDetails] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handler = async () => {
            // TODO: Refactor to use multi search
            // https://developer.themoviedb.org/reference/search-multi
            const movieData: ShowData[] | null = await getMoviesByName(query);
            const tvData: ShowData[] | null = await getTvByName(query);
            setMovieDetails(movieData);
            setTvDetails(tvData);
            setLoading(false);
        };
        handler();
    }, [query]);

    if (loading) {
        return <ShowCardPlaceholder count={5} />;
    }

    // TODO: #438 Handle this error better
    if (!movieDetails && !tvDetails) {
        return <p>Sorry! No show data...</p>;
    }

    return (
        <>
            <h1 data-testid='search-results-heading' className='w-full text-left text-xl p-2 pl-6'>
                Search results for: {query}
            </h1>
            <div className='flex flex-wrap justify-center'>
                {movieDetails?.map((item, i) => {
                    return (
                        <ShowCard
                            key={i}
                            details={item}
                            showType={'movie'}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    );
                })}
                {tvDetails?.map((item, i) => {
                    return (
                        <ShowCard
                            key={i}
                            details={item}
                            showType={'tv'}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    );
                })}
            </div>
        </>
    );
}
