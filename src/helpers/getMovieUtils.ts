import { MovieByName, MovieDetailsData, ShowProviders, ShowData } from '../types';

/**
 * This function is ran after the user enters a name of a movie.
 * @param name | Name of show being queried
 * @returns {Promise<MovieByName>} | List of movies by searched query.
 */
const getMoviesByName = async (name: string): Promise<MovieByName> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    return response.json() as Promise<MovieByName>;
};

/**
 * This function is ran for specific <ShowCard /> data with a movieID.
 * @param id | MovieDB id of show being queried
 * @returns {Promise<ShowData>} | Specific data for a movie that is not originally supplied by getMoviesByName.
 */
const getMovieDetails = async (id: number): Promise<ShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates`
    );
    const data = (await response.json()) as MovieDetailsData;
    const returnRating = (arr: MovieDetailsData) => {
        for (let i = 0; i < arr.release_dates.results.length; i++) {
            if (arr.release_dates.results[i].iso_3166_1 === 'US') {
                return arr.release_dates.results[i].release_dates[0].certification;
            }
        }
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
    };
};

/**
 * This function is ran for a specified movie to return streaming services with a Movie ID.
 * @param id | MovieDB id of show being queried
 * @returns {Promise<ShowProviders>} | Returns list of streaming services.
 */
const getMovieProviders = async (id: number): Promise<ShowProviders> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<ShowProviders>;
};

/**
 * This function returns trending movies, tv shows, or both. /all instead of /movie will alter its behavior. Similarly, /day instead of /week will return daily trending.
 * @returns {Promise<MovieByName>} | Trending Movies & TV Shows
 */
const getTrending = async (): Promise<MovieByName> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<MovieByName>;
};

export { getMoviesByName, getMovieDetails, getMovieProviders, getTrending };
