import { useState, useEffect } from 'react';
import { useProfileContext, useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel } from '../components';
import { ShowData } from '../types/tmdb';
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
    const [actionAdventure, setActionAdventure] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {
            // Highest Rated
            const highRatedMovies: ShowData[] | null = await discoverMovies(
                false,
                false,
                1,
                undefined,
                'popularity.desc',
                undefined,
                8.0,
                2000,
                undefined,
                undefined,
                undefined
            );
            const highRatedTv: ShowData[] | null = await discoverTv(
                false,
                1,
                undefined,
                'popularity.desc',
                undefined,
                8.0,
                2000
            );
            const highRatedShows: ShowData[] = [];
            if (highRatedMovies && highRatedTv)
                highRatedShows.push(...highRatedMovies, ...highRatedTv);
            setHighestRated(highRatedShows);

            // Newly Added
            // TODO: #613
            const newlyAddedMovies: ShowData[] | null = await discoverMovies(
                false,
                false,
                1,
                undefined,
                'popularity.desc',
                undefined,
                undefined,
                2000,
                undefined,
                '2023-01-01',
                undefined
            );
            const newlyAddedTv: ShowData[] | null = await discoverTv(
                false,
                1,
                undefined,
                'popularity.desc',
                undefined,
                undefined,
                2000,
                undefined,
                '2023-01-01'
            );
            const newlyAddedShows: ShowData[] = [];
            if (newlyAddedMovies && newlyAddedTv)
                newlyAddedShows.push(...newlyAddedMovies, ...newlyAddedTv);
            setNewlyAdded(newlyAddedShows);

            const actionAdventureMovies = await discoverMovies(false, false, 1, '28,12', 'popularity.desc', undefined, 5.0, 2000, undefined, undefined, undefined)
            const actionAdventureTv = await discoverTv(false, 1, '10759', 'popularity.desc', undefined, 5.0, 2500, undefined, undefined, undefined);
            console.log(actionAdventureMovies, actionAdventureTv);
            const actionAdventureShows: ShowData[] = [];
            if (actionAdventureMovies && actionAdventureTv) actionAdventureShows.push(...actionAdventureMovies, ...actionAdventureTv)
            setActionAdventure(actionAdventureShows);
        };
        handler();
    }, []);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return (
        <div className=''>
            <div className='w-full flex flex-col justify-start items-start my-6'>
                <Typ variant='h6'>Discover Trending</Typ>
                <ShowCarousel data={trendingShows} />
            </div>

            <div className='w-full flex flex-col justify-start items-start my-6'>
                <Typ variant='h6'>Highest Rated Shows</Typ>
                <ShowCarousel data={highestRated} />
            </div>
            <div className='w-full flex flex-col justify-start items-start my-6'>
                <Typ variant='h6'>Newly Added Shows</Typ>
                <ShowCarousel data={newlyAdded} />
            </div>

            <div>
                <Typ variant='h4'>Browse by Genre</Typ>
                <div className='flex flex-col items-start'>
                    <Typ variant='h5'>Action & Adventure</Typ>
                    <ShowCarousel data={actionAdventure} />
                </div>
            </div>

        </div>
    );
}
