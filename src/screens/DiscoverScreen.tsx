import { useState, useEffect } from 'react';
import { useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';
import { ShowCarousel, Banner } from '../components';
import { ShowData, DiscoverMovie, DiscoverTv } from '../types/tmdb';
import { getDiscoverMovies, getDiscoverTv } from '../helpers';
/**
 * Requests a variety of filtered shows, rendering carousels
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { trendingShows, loading } = useTrendingShows('alpha');
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);
    const [actionAdventure, setActionAdventure] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);
    const [horror, setHorror] = useState<ShowData[] | null>(null);
    const [popularNetflix, setPopularNetflix] = useState<ShowData[] | null>(null);
    const [popularPrime, setPopularPrime] = useState<ShowData[] | null>(null);
    const [popularHulu, setPopularHulu] = useState<ShowData[] | null>(null);

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

        const netflixHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '8',
            };
            const netflixMovies = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '8',
            };
            const netflixTv = await getDiscoverTv(tvParams);

            const netflixShows: ShowData[] = [];

            if (netflixMovies && netflixTv) netflixShows.push(...netflixMovies, ...netflixTv);
            setPopularNetflix(netflixShows);
        };

        const primeHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '9',
            };
            const primeMovies = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '9',
            };
            const primeTv = await getDiscoverTv(tvParams);

            const primeShows: ShowData[] = [];

            if (primeMovies && primeTv) primeShows.push(...primeMovies, ...primeTv);
            setPopularPrime(primeShows);
        };

        const huluHandler = async () => {
            const movieParams: DiscoverMovie = {
                include_adult: false,
                include_video: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '15',
            };
            const huluMovies = await getDiscoverMovies(movieParams);

            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '15',
            };
            const huluTv = await getDiscoverTv(tvParams);

            const huluShows: ShowData[] = [];

            if (huluMovies && huluTv) huluShows.push(...huluMovies, ...huluTv);
            setPopularHulu(huluShows);
        };

        highRatedHandler();
        newlyAddedHandler();
        actionAdventureHandler();
        comedyHandler();
        HorrorHandler();
        netflixHandler();
        primeHandler();
        huluHandler();
    }, []);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p>Loading...</p>;

    return (
        <div className='w-full'>
            <div className='my-12 flex flex-col items-center'>
                <Banner data={trendingShows} title={'Discover Our Popular Shows'} />
                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h6'>
                        Discover Trending
                    </Typ>
                    <ShowCarousel data={trendingShows} />
                </div>

                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h6'>
                        Highest Rated Shows
                    </Typ>
                    <ShowCarousel data={highestRated} />
                </div>
                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h6'>
                        Newly Added Shows
                    </Typ>
                    <ShowCarousel data={newlyAdded} />
                </div>
            </div>

            <div className='my-12 flex flex-col items-center'>
                <Banner data={actionAdventure} title={'Genres'} />
                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Action & Adventure
                    </Typ>
                    <ShowCarousel data={actionAdventure} />
                </div>

                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Comedy
                    </Typ>
                    <ShowCarousel data={comedy} />
                </div>

                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Horror
                    </Typ>
                    <ShowCarousel data={horror} />
                </div>
            </div>

            <div className='my-12 flex flex-col items-center'>
                <Banner data={popularNetflix} title={'Platforms'} />
                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Popular on Netflix
                    </Typ>
                    <ShowCarousel data={popularNetflix} />
                </div>

                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Popular on Prime
                    </Typ>
                    <ShowCarousel data={popularPrime} />
                </div>

                <div className='text-left my-6'>
                    <Typ sx={{ marginY: 1 }} variant='h5'>
                        Popular on Hulu
                    </Typ>
                    <ShowCarousel data={popularHulu} />
                </div>
            </div>
        </div>
    );
}
