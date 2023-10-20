import Logger from '../logger';
import { MovieResults, MovieDetailsData, ShowProviders, ShowData, DiscoverMovie } from '../types';
import { MOVIE_RATINGS } from './constants';

const LOG = new Logger('getMovieUtils');
/**
 * Returns a list of movies based on a given search query.
 * @param name | Name of movie being queried
 * @returns {Promise<ShowData[]>} | List of movies
 */
const getMoviesByName = async (name: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as MovieResults;
    if (!data.results) return null;
    return data.results.map((movie) => {
        return {
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            overview: movie.overview,
            media_type: 'movie',
            genre_ids: movie.genre_ids,
        };
    });
};

/**
 * Returns more detailed information about a given movie.
 * @param id | MovieDB id of movie being queried
 * @returns {Promise<ShowData>} | Movie details
 */
const getMovieDetails = async (id: number): Promise<ShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as MovieDetailsData;
    const returnRating = (arr: MovieDetailsData) => {
        let release_date, release_dates;
        for (let i = 0; i < arr.release_dates.results.length; i++) {
            if (arr.release_dates.results[i].iso_3166_1 === 'US') {
                release_dates = arr.release_dates.results[i].release_dates;
                break;
            }
        }
        release_dates?.map((r) => {
            if (r.certification in MOVIE_RATINGS) release_date = r.certification;
        });

        if (release_date) return release_date;
        return 'No rating available';
    };
    return {
        id: data.id,
        poster_path: data.poster_path,
        title: data.original_title,
        release_date: data.release_date,
        age_rating: returnRating(data),
        runtime: data.runtime,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        overview: data.overview,
        media_type: 'movie',
        genre_ids: data.genre_ids,
    };
};

/**
 * Returns a list of streaming providers for a given movie.
 * @param id | MovieDB id of movie being queried
 * @returns {Promise<ShowProviders>} | List of streaming services.
 */
const getMovieProviders = async (id: number): Promise<ShowProviders> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    return response.json() as Promise<ShowProviders>;
};

/**
 * Returns a list of currently trending movies.
 * @returns {Promise<MovieResults>} | Trending movies
 */
const getMovieTrending = async (): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as MovieResults;
    if (!data.results) return null;
    return data.results.map((movie) => {
        return {
            id: movie.id,
            poster_path: movie.poster_path,
            banner_path: movie.backdrop_path,
            title: movie.title,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            overview: movie.overview,
            media_type: 'movie',
            genre_ids: movie.genre_ids,
        };
    });
};

/**
 * Returns recommended movies based off of a given movie
 * @param id | MovieDB id of movie being searched for
 * @returns {Promise<ShowData[] | null>} | Array of recommended movies
 */
const getMovieRecommendations = async (id: number): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as MovieResults;
    if (!data.results || data.results.length < 1) return null;
    return data.results.map((rec) => {
        return {
            id: rec.id,
            overview: rec.overview,
            poster_path: rec.poster_path,
            release_date: rec.release_date,
            title: rec.title,
            vote_average: rec.vote_average,
            vote_count: rec.vote_count,
            media_type: 'movie',
            genre_ids: rec.genre_ids,
        };
    });
};

/**
 * Returns movies based on parameters provided
 * @param include_adult
 * @param include_video
 * @param pages
 * @param with_genres | String of genre IDs, can be a comma (AND) or pipe (OR) separated query
 * @param sort_by | defaults to 'popularity.desc'
 * @param vote_average_lte
 * @param vote_average_gte
 * @param vote_count_gte
 * @param vote_count_lte
 * @param release_date_gte | Greater or Equal To YYYY-MM-DD
 * @param release_date_lte | Less or Equal To YYYY-MM-DD
 * @param watch_region
 * @param with_watch_providers
 * @returns {Promise<ShowData[] | null>} | Array of discovered movies
 */
const getDiscoverMovies = async (params: DiscoverMovie): Promise<ShowData[] | null> => {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_MOVIEDB_KEY
    }&include_adult=${params.include_adult}&language=en-US&page=${params.pages}&region=us`;

    if (params.with_genres) url += `&with_genres=${params.with_genres}`;
    if (params.sort_by) url += `&sort_by=${params.sort_by}`;
    if (params.vote_average_lte) url += `&vote_average.lte=${params.vote_average_lte}`;
    if (params.vote_average_gte) url += `&vote_average.gte=${params.vote_average_gte}`;
    if (params.vote_count_gte) url += `&vote_count.gte=${params.vote_count_gte}`;
    if (params.vote_count_lte) url += `&vote_count.lte=${params.vote_count_lte}`;
    if (params.release_date_gte) url += `&release_date.gte=${params.release_date_gte}`;
    if (params.release_date_lte) url += `&release_date.lte=${params.release_date_lte}`;
    if (params.watch_region) url += `&watch_region=${params.watch_region}`;
    if (params.with_watch_providers) url += `&with_watch_providers=${params.with_watch_providers}`;

    const response = await fetch(url);

    const data = (await response.json()) as MovieResults;
    if (!data.results || data.results.length < 1) return null;
    return data.results.map((movie) => {
        return {
            id: movie.id,
            overview: movie.overview,
            poster_path: movie.poster_path,
            banner_path: movie.backdrop_path,
            release_date: movie.release_date,
            title: movie.title,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            media_type: 'movie',
            genre_ids: movie.genre_ids,
        };
    });
};

export {
    getMoviesByName,
    getMovieDetails,
    getMovieProviders,
    getMovieTrending,
    getMovieRecommendations,
    getDiscoverMovies,
};
