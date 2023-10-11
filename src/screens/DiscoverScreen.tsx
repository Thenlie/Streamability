import { useState, useEffect } from 'react';
import { useProfileContext, useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel } from '../components';
import { ShowData } from '../types/tmdb';
import {
    filterShowsByAvgRatingAbove,
    filterShowsByGenre,
} from '../helpers';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    // const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);

    // Shows
    const { trendingShows, loading } = useTrendingShows('alpha');
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);

    // Movies

    // TV

    useEffect(() => {
        if (trendingShows) {
            const avgRatingAbove: ShowData[] = filterShowsByAvgRatingAbove(trendingShows, 4);
            setHighestRated(avgRatingAbove);
            // const newlyAdded: showData[] = filterShowsByReleaseAfter()
            const showsByComedy: ShowData[] = filterShowsByGenre(trendingShows, 35);
            setComedy(showsByComedy);
        }
    }, []);

    console.log(trendingShows);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return (
        <div className=''>
            <div className='w-full flex flex-col justify-center items-center'>
                <Typ>Discover Trending</Typ>
                <ShowCarousel data={trendingShows}></ShowCarousel>
            </div>

            <div>
                <Typ>Highest Rated</Typ>
            </div>
        </div>
    );
}
