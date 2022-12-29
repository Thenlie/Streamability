import { MovieData, MovieDetailsData, MovieProviders } from '../types/tmdb';

/**
 * This function is ran after the user enters a name of a movie.
 * @returns {Promise<MovieData>} | List of movies by searched query.
 */
const getMoviesByName = async (name: string): Promise<MovieData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    return response.json() as Promise<MovieData>;
};

/**
 * This function is ran for specific <ShowCard /> data with a movieID.
 * @returns {Promise<MovieDetailsData>} | Specific data for a movie that is not originally supplied by getMoviesByName.
 */
const getMovieDetails = async (id: number): Promise<MovieDetailsData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates`
    );
    return response.json() as Promise<MovieDetailsData>;
};

/**
 * This function is ran for a specified movie to return streaming services with a movieID.
 * @returns {Promise<MovieDetailsData>} | Specific data for a movie that is not originally supplied by getMoviesByName.
 */
const getMovieProviders = async (id: number): Promise<MovieProviders> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<MovieProviders>;
};

/**
 * This function returns trending movies, tv shows, or both. /all instead of /movie will alter its behavior. Similarly, /day instead of /week will return daily trending.
 * @returns @returns {Promise<MovieData>} | Trending Movies & TV Shows
 */
const getTrending = async (): Promise<MovieData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<MovieData>;
};

export { getMoviesByName, getMovieDetails, getMovieProviders, getTrending };
