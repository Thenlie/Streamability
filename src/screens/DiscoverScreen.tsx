import { useState, useEffect } from 'react';
import { useProfileContext, useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel } from '../components';
import { ShowData } from '../types/tmdb';
import { filterShowsByAvgRatingAbove, filterShowsByGenre } from '../helpers';
import { discoverMovies, discoverTv } from '../helpers';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    const { trendingShows, loading } = useTrendingShows('alpha');

    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {

            // Highest Rated
            const highRatedMovies: ShowData[] | null = await discoverMovies(false, false, 1, undefined, 'popularity.desc', undefined, 8.0, 2000, undefined, undefined, undefined);
            const highRatedTv: ShowData[] | null = await discoverTv(false, 1, undefined, 'popularity.desc', undefined, 8.0, 2000);
            const highRatedShows: ShowData[] = [];
            if (highRatedMovies && highRatedTv) highRatedShows.push(...highRatedMovies, ...highRatedTv);
            setHighestRated(highRatedShows);

            // Newly Added
            // TODO: #613
            const newlyAddedMovies: ShowData[] | null = await discoverMovies(false, false, 1, undefined, 'popularity.desc', undefined, undefined, 2000, undefined, '2023-01-01', undefined)
            const newlyAddedTv: ShowData[] | null = await discoverTv(false, 1, undefined, 'popularity.desc', undefined, undefined, 2000, undefined, '2023-01-01')
            const newlyAddedShows: ShowData[] = [];
            if (newlyAddedMovies && newlyAddedTv) newlyAddedShows.push(...newlyAddedMovies, ...newlyAddedTv);
            setNewlyAdded(newlyAddedShows);
            
            
        };
        handler();
    }, []);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return (
        <div className=''>
            <div className='w-full flex flex-col justify-center items-center'>
                <Typ>Discover Trending</Typ>
                <ShowCarousel data={trendingShows}/>
            </div>

            <div>
                <Typ>Highest Rated Shows</Typ>
                <ShowCarousel data={highestRated} />
            </div>
            <div>
                <Typ>Newly Added Shows</Typ>
                <ShowCarousel data={newlyAdded} />
            </div>
        </div>
    );
}
