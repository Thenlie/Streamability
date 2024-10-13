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
import { useProfileContext } from '../../hooks';
import SearchResultCards from '../search_results/SearchResultsCards';
import { useLoaderData } from 'react-router-dom';
import { usePaginatedData } from '../../hooks';
import DetailScreen from '../DetailScreen';

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
        <div
            className='flex flex-col items-center w-full m-6'
            data-testid={`discover-details-${path}-screen`}
        >
            <DetailScreen
                viewState={viewState}
                setViewState={setViewState}
                data={data}
                setData={setData}
                setHash={setHash}
                cards={cards}
                moreToFetch={moreToFetch}
                loadMoreRef={loadMoreRef}
            />
        </div>
    );
};

export default DiscoverDetailScreen;
