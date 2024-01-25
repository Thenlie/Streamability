import { getDiscoverMovies, getDiscoverTv } from '../../helpers';
import { DiscoverMovie, DiscoverTv, ShowData } from '../../types';

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

interface HandlerProps {
    setState: React.Dispatch<React.SetStateAction<ShowData[] | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const highRatedHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        pages: 1,
        sort_by: 'popularity.desc',
        vote_average_gte: 8.0,
        vote_count_gte: 2000,
    };
    discoverHandler(params, params, setState, setLoading);
};

const newlyAddedHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        pages: 1,
        sort_by: 'popularity.desc',
        vote_count_gte: 2000,
        // TODO: #613 Dynamic date range
        release_date_gte: '2023-01-01',
    };
    discoverHandler(params, params, setState, setLoading);
};

const actionAdventureHandler = async ({ setState, setLoading }: HandlerProps) => {
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
    discoverHandler(movieParams, tvParams, setState, setLoading);
};

const comedyHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        include_adult: false,
        include_video: false,
        pages: 1,
        with_genres: '35',
        sort_by: 'popularity.desc',
        vote_average_gte: 5.0,
        vote_count_gte: 2500,
    };
    discoverHandler(params, params, setState, setLoading);
};

const horrorHandler = async ({ setState, setLoading }: HandlerProps) => {
    // Only Movie
    const movieParams: DiscoverMovie = {
        pages: 1,
        with_genres: '27',
        sort_by: 'popularity.desc',
        vote_average_gte: 5.0,
        vote_count_gte: 2500,
    };
    const horrorMovies = await getDiscoverMovies(movieParams);
    setState(horrorMovies);
    setLoading(false);
};

const netflixHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        pages: 1,
        vote_average_gte: 7.5,
        vote_count_gte: 2500,
        watch_region: 'US',
        with_watch_providers: '8',
    };
    discoverHandler(params, params, setState, setLoading);
};

const primeHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        pages: 1,
        vote_average_gte: 7.5,
        vote_count_gte: 2500,
        watch_region: 'US',
        with_watch_providers: '9',
    };
    discoverHandler(params, params, setState, setLoading);
};

const huluHandler = async ({ setState, setLoading }: HandlerProps) => {
    const params: DiscoverMovie | DiscoverTv = {
        pages: 1,
        vote_average_gte: 7.5,
        vote_count_gte: 2500,
        watch_region: 'US',
        with_watch_providers: '15',
    };
    discoverHandler(params, params, setState, setLoading);
};

export {
    highRatedHandler,
    newlyAddedHandler,
    actionAdventureHandler,
    comedyHandler,
    horrorHandler,
    netflixHandler,
    huluHandler,
    primeHandler,
};
