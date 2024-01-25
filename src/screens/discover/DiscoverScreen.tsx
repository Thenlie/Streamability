import { useState, useEffect } from 'react';
import { useTrendingShows } from '../../hooks';
import { ShowCarousel, Banner, OfflineSnackbar } from '../../components';
import { ShowData, DiscoverMovie, DiscoverTv } from '../../types/tmdb';
import { getDiscoverMovies, getDiscoverTv } from '../../helpers';
import { useNavigate } from 'react-router-dom';
/**
 * Requests a variety of filtered shows, rendering carousels
 * @returns {JSX.Element}
 */
const DiscoverScreen: React.FC = () => {
    const { trendingShows, loading } = useTrendingShows('alpha');
    const navigate = useNavigate();
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);
    const [actionAdventure, setActionAdventure] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);
    const [horror, setHorror] = useState<ShowData[] | null>(null);
    const [popularNetflix, setPopularNetflix] = useState<ShowData[] | null>(null);
    const [popularPrime, setPopularPrime] = useState<ShowData[] | null>(null);
    const [popularHulu, setPopularHulu] = useState<ShowData[] | null>(null);
    // Loading states
    const [highestRatedLoading, setHighestRatedLoading] = useState<boolean>(true);
    const [newlyAddedLoading, setNewlyAddedLoading] = useState<boolean>(true);
    const [actionAdventureLoading, setActionAdventureLoading] = useState<boolean>(true);
    const [comedyLoading, setComedyLoading] = useState<boolean>(true);
    const [horrorLoading, setHorrorLoading] = useState<boolean>(true);
    const [popularNetflixLoading, setPopularNetflixLoading] = useState<boolean>(true);
    const [popularPrimeLoading, setPopularPrimeLoading] = useState<boolean>(true);
    const [popularHuluLoading, setPopularHuluLoading] = useState<boolean>(true);

    const discoverHandler = async (
        movieParams: DiscoverMovie,
        tvParams: DiscoverTv,
        setState: React.Dispatch<React.SetStateAction<ShowData[] | null>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        const movies: ShowData[] | null = await getDiscoverMovies(movieParams);
        const tv: ShowData[] | null = await getDiscoverTv(tvParams);
        const shows: ShowData[] | null = [];

        if (movies && tv) shows.push(...movies, ...tv);
        setState(shows);
        setLoading(false);
    };

    useEffect(() => {
        const highRatedHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                pages: 1,
                sort_by: 'popularity.desc',
                vote_average_gte: 8.0,
                vote_count_gte: 2000,
            };
            discoverHandler(params, params, setHighestRated, setHighestRatedLoading);
        };

        const newlyAddedHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                pages: 1,
                sort_by: 'popularity.desc',
                vote_count_gte: 2000,
                // TODO: #613 Dynamic date range
                release_date_gte: '2023-01-01',
            };
            discoverHandler(params, params, setNewlyAdded, setNewlyAddedLoading);
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
            const tvParams: DiscoverTv = {
                include_adult: false,
                pages: 1,
                with_genres: '10759',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            discoverHandler(movieParams, tvParams, setActionAdventure, setActionAdventureLoading);
        };

        const comedyHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                include_adult: false,
                include_video: false,
                pages: 1,
                with_genres: '35',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            discoverHandler(params, params, setComedy, setComedyLoading);
        };

        const horrorHandler = async () => {
            // Only Movie
            const movieParams: DiscoverMovie = {
                pages: 1,
                with_genres: '27',
                sort_by: 'popularity.desc',
                vote_average_gte: 5.0,
                vote_count_gte: 2500,
            };
            const HorrorMovies = await getDiscoverMovies(movieParams);
            setHorror(HorrorMovies);
            setHorrorLoading(false);
        };

        const netflixHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '8',
            };
            discoverHandler(params, params, setPopularNetflix, setPopularNetflixLoading);
        };

        const primeHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '9',
            };
            discoverHandler(params, params, setPopularPrime, setPopularPrimeLoading);
        };

        const huluHandler = async () => {
            const params: DiscoverMovie | DiscoverTv = {
                pages: 1,
                vote_average_gte: 7.5,
                vote_count_gte: 2500,
                watch_region: 'US',
                with_watch_providers: '15',
            };
            discoverHandler(params, params, setPopularHulu, setPopularHuluLoading);
        };
        highRatedHandler();
        newlyAddedHandler();
        actionAdventureHandler();
        comedyHandler();
        horrorHandler();
        netflixHandler();
        primeHandler();
        huluHandler();
    }, []);

    const sections = [
        {
            data: trendingShows,
            dataLoading: loading,
            title: 'Trending',
            path: 'trending',
        },
        {
            data: highestRated,
            dataLoading: highestRatedLoading,
            title: 'Highest Rated',
            path: 'best',
        },
        {
            data: newlyAdded,
            dataLoading: newlyAddedLoading,
            title: 'Newly Added',
            path: 'new',
        },
        {
            data: actionAdventure,
            dataLoading: actionAdventureLoading,
            title: 'Action & Adventure',
            path: 'action',
        },
        {
            data: comedy,
            dataLoading: comedyLoading,
            title: 'Comedy',
            path: 'comedy',
        },
        {
            data: horror,
            dataLoading: horrorLoading,
            title: 'Horror',
            path: 'horror',
        },
        {
            data: popularNetflix,
            dataLoading: popularNetflixLoading,
            title: 'Popular on Netflix',
            path: 'netflix',
        },
        {
            data: popularHulu,
            dataLoading: popularHuluLoading,
            title: 'Popular on Hulu',
            path: 'hulu',
        },
        {
            data: popularPrime,
            dataLoading: popularPrimeLoading,
            title: 'Popular on Prime',
            path: 'prime',
        },
    ];

    return (
        <div className='w-full'>
            <Banner data={trendingShows} title={'Discover Our Popular Shows'} />
            <div className='my-12 flex flex-col items-center'>
                {sections.map((section, i) => {
                    return (
                        <>
                            {i === 3 && <Banner data={actionAdventure} title='Genres' />}
                            {i === 6 && <Banner data={popularNetflix} title='Platforms' />}
                            <div className='my-6' key={i}>
                                <ShowCarousel
                                    data={section.data}
                                    dataLoading={section.dataLoading}
                                    headerProps={{
                                        title: section.title,
                                        hasButton: true,
                                        buttonTitle: 'View More',
                                        onClick: () => navigate(`${section.path}`),
                                    }}
                                />
                            </div>
                        </>
                    );
                })}
            </div>
            <OfflineSnackbar />
        </div>
    );
};

export default DiscoverScreen;
