import { useEffect, useState } from 'react';
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
import { Typography } from '@mui/material';

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
    const { profile, setProfile } = useProfileContext();
    const path = window.location.pathname
        .match(/\/\w+$/)
        ?.join()
        .slice(1);
    const [data, setData] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (path) requestHandler({ path: path, setState: setData, setLoading: setLoading });
    }, []);

    const title = path ? PATHS[PATHS.findIndex((p) => p.path === path)].title : '';

    // TODO: Create loader #839
    if (loading) return <p>Loading...</p>;

    return (
        <div
            className='flex flex-col items-center w-full m-6'
            data-testid={`discover-details-${path}-screen`}
        >
            <Typography variant='h4'>{title}</Typography>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                {data?.map((item, i) => (
                    <ShowCard key={i} details={item} profile={profile} setProfile={setProfile} />
                ))}
            </div>
        </div>
    );
};

export default DiscoverDetailScreen;
