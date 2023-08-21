import { useLoaderData } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { getMoviesByName } from '../helpers/getMovieUtils';
import { ShowCard, ShowListCard, ShowCardProps, ShowListCardProps } from '../components';
import { ShowData } from '../types';
import { getTvByName } from '../helpers/getTvUtils';
import ShowCardPlaceholder from '../components/ShowCardPlaceholder';
import { useProfileContext, useWindowSize } from '../hooks';
import { ToggleButton } from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';

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
 * The page displayed after a user makes a search query
 *
 * @returns {JSX.Element}
 */
export default function SearchResultsScreen(): JSX.Element {
    const query: string = useLoaderData() as string;
    const { profile, setProfile } = useProfileContext();
    const windowSize = useWindowSize();
    const [viewState, setViewState] = useState<'list' | 'grid'>('list');
    const [movieDetails, setMovieDetails] = useState<ShowData[] | null>(null);
    const [tvDetails, setTvDetails] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // default to grid view on mobile
        if (windowSize.width && windowSize.width < 750) {
            setViewState('grid');
        }
    }, [windowSize]);

    useEffect(() => {
        const handler = async () => {
            // TODO: #478 Refactor to use multi search
            // https://developer.themoviedb.org/reference/search-multi
            const movieData: ShowData[] | null = await getMoviesByName(query);
            const tvData: ShowData[] | null = await getTvByName(query);
            setMovieDetails(movieData);
            setTvDetails(tvData);
            setLoading(false);
        };
        handler();
    }, [query]);

    const handleViewToggle = () => {
        setViewState((prev) => (prev === 'grid' ? 'list' : 'grid'));
    };

    /**
     * Loops over show details and creates an array of show cards
     * using the correct component based on the `viewState`
     *
     * @returns {JSX.Element}
     */
    const searchResultCards = useMemo((): JSX.Element => {
        const CardComp: React.FC<ShowCardProps | ShowListCardProps> = (props) => {
            return viewState === 'grid' ? <ShowCard {...props} /> : <ShowListCard {...props} />;
        };

        return (
            <>
                {movieDetails?.map((item, i) => {
                    return (
                        <CardComp
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
                        <CardComp
                            key={i}
                            details={item}
                            showType={'tv'}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    );
                })}
            </>
        );
    }, [movieDetails, tvDetails, viewState]);

    if (loading) {
        return <ShowCardPlaceholder count={5} />;
    }

    // TODO: #438 Handle this error better
    if (!movieDetails && !tvDetails) {
        return <p>Sorry! No show data...</p>;
    }

    return (
        <>
            <div className='flex justify-between align-middle w-full p-3'>
                <h1
                    data-testid='search-results-heading'
                    className='w-full text-left text-xl self-center'
                >
                    Search results for: {query}
                </h1>
                <ToggleButton
                    sx={windowSize.width && windowSize.width < 750 ? { display: 'none' } : {}}
                    value='toggle card view'
                    aria-label='toggle card view'
                    onClick={handleViewToggle}
                >
                    {viewState === 'grid' ? <ViewList /> : <ViewModule />}
                </ToggleButton>
            </div>
            <div className='flex flex-wrap justify-center pb-4'>{searchResultCards}</div>
        </>
    );
}
