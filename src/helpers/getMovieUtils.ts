import { MovieResults, MovieDetailsData, ShowProviders, ShowData } from '../types';

enum MovieRatings {
    'G',
    'PG',
    'PG-13',
    'R',
}

/**
 * This function is ran after the user enters a name of a movie.
 * @param name | Name of show being queried
 * @returns {Promise<ShowData[]>} | List of movies by searched query.
 */
const getMoviesByName = async (name: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    const data = (await response.json()) as MovieResults;
    if (data.results) {
        return data.results.map((movie) => {
            return {
                id: movie.id,
                poster_path: movie.poster_path,
                title: movie.title,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count,
                overview: movie.overview,
            };
        });
    }
    return null;
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
        let release_date, release_dates;
        for (let i = 0; i < arr.release_dates.results.length; i++) {
            if (arr.release_dates.results[i].iso_3166_1 === 'US') {
                release_dates = arr.release_dates.results[i].release_dates;
                break;
            }
        }
        release_dates?.map((r) => {
            if (r.certification in MovieRatings) release_date = r.certification;
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
 * @returns {Promise<MovieResults>} | Trending Movies & TV Shows
 */
const getTrending = async (): Promise<MovieResults> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<MovieResults>;
};

/**
 * Get recommended movies based off of a movie
 * @param id | MovieDB id of movie being searched for
 * @returns {Promise<ShowData[] | null>} | Array of recommended movies
 */
const getMovieRecommendations = async (id: number): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    const data = (await response.json()) as MovieResults;
    if (!data.results || data.results.length < 1) return null;
    const recommendations: ShowData[] = [];
    data.results.map((rec) =>
        recommendations.push({
            id: rec.id,
            overview: rec.overview,
            poster_path: rec.poster_path,
            release_date: rec.release_date,
            title: rec.title,
            vote_average: rec.vote_average,
            vote_count: rec.vote_count,
        })
    );
    return recommendations;
};

export {
    getMoviesByName,
    getMovieDetails,
    getMovieProviders,
    getTrending,
    getMovieRecommendations,
};
