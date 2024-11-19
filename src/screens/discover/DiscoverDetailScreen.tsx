import { useEffect, useState, useMemo } from 'react';
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
import DetailScreen from '../DetailScreen';
import { Typography } from '@mui/material';
import DiscoverDetailsLoader from '../loaders/DiscoverDetailsLoader';

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

const DiscoverDetailScreen: React.FC = () => {
    const viewStateKey: string = 'streamabilityDiscoverDetailView';
    const { profile, setProfile } = useProfileContext();
    const path = window.location.pathname
        .match(/\/\w+$/)
        ?.join()
        .slice(1);
    const [loading, setLoading] = useState<boolean>(true);
    const storageItem = localStorage.getItem(viewStateKey);
    const initialView = storageItem === 'grid' ? 'grid' : 'list';
    const [viewState, setViewState] = useState<'list' | 'grid'>(initialView);
    const [hash, setHash] = useState<number>(1);
    const [data, setData] = useState<ShowData[] | null>(null);

    useEffect(() => {
        if (path) requestHandler({ path: path, setState: setData, setLoading: setLoading });
    }, []);

    const title = path ? PATHS[PATHS.findIndex((p) => p.path === path)].title : '';

    if (!storageItem) localStorage.setItem(viewStateKey, initialView);

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
    // if (loading) return (
    //     <DiscoverDetailsLoader path={title} viewState={viewState} />
    // );

    return (
        <div
            className='flex flex-col items-center w-full m-6'
            data-testid={`discover-details-${path}-screen`}
        >
            <Typography variant='h4'>{title}</Typography>
            {
                loading
                    ? <DiscoverDetailsLoader path={title} viewState={viewState} />
                    : <DetailScreen
                        viewStateKey={viewStateKey}
                        viewState={viewState}
                        setViewState={setViewState}
                        data={data}
                        setData={setData}
                        setHash={setHash}
                        cards={cards}
                        disableAlphabeticOrderFilter={true}
                        disableResultTypeFilter={true}
                    />
            }
        </div>
    );
};

export default DiscoverDetailScreen;
