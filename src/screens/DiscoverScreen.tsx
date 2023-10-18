import { useState, useEffect } from 'react';
import { useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel } from '../components';
import { ShowData, DiscoverMovie, DiscoverTv } from '../types/tmdb';
import { getDiscoverMovies, getDiscoverTv } from '../helpers';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { trendingShows, loading } = useTrendingShows('alpha');
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);
    const [actionAdventure, setActionAdventure] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);
    const [horror, setHorror] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const highRatedHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                sort_by: 'popularity.desc',
                vote_average_gte: 8.0,
                vote_count_gte: 2000,
            };
            const highRatedMovies: ShowData[] | null = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                sort_by: 'popularity.desc',
                vote_average_gte: 8.0,
                vote_count_gte: 2000,
            };
            const highRatedTv: ShowData[] | null = await getDiscoverTv(tvParams);

            const highRatedShows: ShowData[] = [];

            if (highRatedMovies && highRatedTv)
                highRatedShows.push(...highRatedMovies, ...highRatedTv);
            setHighestRated(highRatedShows);
        };

        const newlyAddedHandler = async () => {
            // TODO: #613
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                sort_by: 'popularity.desc',
                vote_count_gte: 2000,
                release_date_gte: '2023-01-01',
            };
            const newlyAddedMovies: ShowData[] | null = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                sort_by: 'popularity.desc',
                vote_count_gte: 2000,
                first_air_date_gte: '2023-01-01',
            };
            const newlyAddedTv: ShowData[] | null = await getDiscoverTv(tvParams);

            const newlyAddedShows: ShowData[] = [];

            if (newlyAddedMovies && newlyAddedTv)
                newlyAddedShows.push(...newlyAddedMovies, ...newlyAddedTv);
            setNewlyAdded(newlyAddedShows);
        };

        const actionAdventureHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                with_genres: '28,12',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2000,
            };
            const actionAdventureMovies = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                with_genres: '10759',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            const actionAdventureTv = await getDiscoverTv(tvParams);

            const actionAdventureShows: ShowData[] = [];

            if (actionAdventureMovies && actionAdventureTv)
                actionAdventureShows.push(...actionAdventureMovies, ...actionAdventureTv);
            setActionAdventure(actionAdventureShows);
        };

        const comedyHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                with_genres: '35',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            const comedyMovies = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                with_genres: '35',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            const comedyTv = await getDiscoverTv(tvParams);

            const comedyShows: ShowData[] = [];

            if (comedyMovies && comedyTv) comedyShows.push(...comedyMovies, ...comedyTv);
            setComedy(comedyShows);
        };

        const HorrorHandler = async () => {
            // Only Movie
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                with_genres: '27',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            const HorrorMovies = await getDiscoverMovies(movieParams);
            setHorror(HorrorMovies);
        };
        highRatedHandler();
        newlyAddedHandler();
        actionAdventureHandler();
        comedyHandler();
        HorrorHandler();
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
                <div className='flex flex-col items-start my-6'>
                    <Typ variant='h5'>Action & Adventure</Typ>
                    <ShowCarousel data={actionAdventure} />
                </div>

                <div className='flex flex-col items-start my-6'>
                    <Typ variant='h5'>Comedy</Typ>
                    <ShowCarousel data={comedy} />
                </div>

                <div className='flex flex-col items-start my-6'>
                    <Typ variant='h5'>Horror</Typ>
                    <ShowCarousel data={horror} />
                </div>
            </div>
        </div>
    );
}
