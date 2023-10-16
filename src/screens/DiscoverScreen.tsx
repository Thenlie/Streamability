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
    // const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);

    // Shows
    const { trendingShows, loading } = useTrendingShows('alpha');
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);

    // Movies

    // TV

    useEffect(() => {
        const handler = async () => {
            if (trendingShows) {
                const avgRatingAbove: ShowData[] = filterShowsByAvgRatingAbove(trendingShows, 4);
                setHighestRated(avgRatingAbove);
                // const newlyAdded: showData[] = filterShowsByReleaseAfter()
                const showsByComedy: ShowData[] = filterShowsByGenre(trendingShows, 35);
                setComedy(showsByComedy);
            }

            const highRatedMovies: ShowData[] | null = await discoverMovies(false, false, 1, undefined, 'popularity.desc', undefined, 7.0, 2000, undefined, undefined, undefined);
            const highRatedTv: ShowData[] | null = await discoverTv(false, 1, undefined, 'popularity.desc', undefined, 7.0, 2000);
            const highRatedShows: ShowData[] = [];
            if (highRatedMovies && highRatedTv) highRatedShows.push(...highRatedMovies, ...highRatedTv);
            setHighestRated(highRatedShows);
            console.log(highestRated);
            
            
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
        </div>
    );
}
