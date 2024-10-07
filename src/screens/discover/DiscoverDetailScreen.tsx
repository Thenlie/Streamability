import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { ShowData } from '../../types';
import {
    actionAdventureHandler,
    comedyHandler,
    highRatedHandler,
    horrorHandler,
    huluHandler,
    netflixHandler,
    newlyAddedHandler,
    primeHandler,
    trendingHandler,
} from './discoverRequests';
import { ShowCard } from '../../components';
import { useProfileContext } from '../../hooks';
import Typ from '@mui/material/Typography';
import { OfflineSnackbar } from '../../components';
import SearchResultCards from '../search_results/SearchResultsCards';
import { SearchResultsLoader } from '../loaders';
import SearchResultsHeader from '../search_results/SearchResultsHeader';
import LoadingIndicator from '../../components/LoadingIndicator';
import Logger from '../../logger';
import { useLoaderData } from 'react-router-dom';
import { usePaginatedData } from '../../hooks';

const PATHS = [
    { path: 'trending', title: 'Trending' },
    { path: 'best', title: 'Highest Rated' },
    { path: 'new', title: 'Newly Added' },
    { path: 'action', title: 'Action & Adventure' },
    { path: 'comedy', title: 'Comedy' },
    { path: 'horror', title: 'Horror' },
    { path: 'netflix', title: 'Popular on Netflix' },
    { path: 'hulu', title: 'Popular on Hulu' },
    { path: 'prime', title: 'Popular on Prime' },
];

interface RequestHandlerProps {
    path: string;
    setState: React.Dispatch<React.SetStateAction<ShowData[] | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Make a MovieDB API request based on the URL path
 * @todo paginate data #838
 */
const requestHandler = async (props: RequestHandlerProps) => {
    const { path, ...rest } = props;
    switch (path) {
        case 'trending':
            await trendingHandler(rest);
            break;
        case 'best':
            await highRatedHandler(rest);
            break;
        case 'new':
            await newlyAddedHandler(rest);
            break;
        case 'action':
            await actionAdventureHandler(rest);
            break;
        case 'comedy':
            await comedyHandler(rest);
            break;
        case 'horror':
            await horrorHandler(rest);
            break;
        case 'netflix':
            await netflixHandler(rest);
            break;
        case 'hulu':
            await huluHandler(rest);
            break;
        case 'prime':
            await primeHandler(rest);
            break;
    }
};

const LOG = new Logger('SearchResultsScreen');

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
        LOG.error('No query found!');
        throw new Response('Bad Request', { status: 400 });
    }
    return query as string;
}

const DiscoverDetailScreen: React.FC = () => {
    const query: string = useLoaderData() as string;
    const { profile, setProfile } = useProfileContext();
    const path = window.location.pathname
        .match(/\/\w+$/)
        ?.join()
        .slice(1);
    const [loading, setLoading] = useState<boolean>(true);
    const storageItem = localStorage.getItem('streamabilityView');
    const initialView = storageItem === 'grid' ? 'grid' : 'list';
    const [viewState, setViewState] = useState<'list' | 'grid'>(initialView);
    const [hash, setHash] = useState<number>(1);
    const {
        data,
        setData,
        loading: dataLoading,
        moreToFetch,
        refetch,
    } = usePaginatedData({ query: query });

    useEffect(() => {
        if (path) requestHandler({ path: path, setState: setData, setLoading: setLoading });
    }, []);

    const observer = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useCallback(
        (node: HTMLDivElement) => {
            if (dataLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && moreToFetch) {
                    refetch();
                }
            });
            if (node) observer.current.observe(node);
        },
        [dataLoading, moreToFetch, refetch]
    );

    const cards = useMemo(() => {
        return (
            <SearchResultCards
                details={data}
                viewState={viewState}
                profile={profile}
                setProfile={setProfile}
            />
        );
    }, [data, hash, viewState, profile]);

    // TODO: Create loader #839r
    if (loading) return <p>Loading...</p>;

    return (
        <div className='flex flex-col items-center w-full' data-testid='search-results-screen'>
            <SearchResultsHeader
                query={query}
                viewState={viewState}
                setViewState={setViewState}
                showDetails={data}
                setShowDetails={setData}
                setHash={setHash}
            />
            <div>
                {cards}
                {moreToFetch && <LoadingIndicator />}{' '}
                {/* Show the indicator while more data is available */}
                <div ref={loadMoreRef}></div>
            </div>
            <OfflineSnackbar />
        </div>
    );
};

export default DiscoverDetailScreen;
