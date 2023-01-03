import { ShowData, TvShowDetailsData, TvShowData } from '../types/tmdb';

/**
 * This function is ran after the user enters a name of a TV Show.
 * @returns {Promise<MovieData>} | List of shows by searched query.
 */
const getShowsByName = async (name: string): Promise<TvShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    return response.json() as Promise<TvShowData>;
};

/**
 * This function is ran for specific <ShowCard /> data with a TV Show ID.
 * @returns {Promise<MovieDetailsData>} | Specific data for a TV Show that is not originally supplied by getMoviesByName.
 */
const getShowDetails = async (id: number): Promise<ShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates,content_ratings`
    );
    const returnRating = async (arr: TvShowDetailsData) => {
        for (let i = 0; i < arr.content_ratings.results.length; i++) {
            if (arr.content_ratings.results[i].iso_3166_1 === 'US') {
                return arr.content_ratings.results[i].rating;
            }
        }
        return null;
    };
    const data = (await response.json()) as TvShowDetailsData;
    const obj: ShowData = {
        id: data.id,
        poster_path: data.poster_path,
        title: data.original_name,
        release_date: data.first_air_date,
        runtime: data.episode_run_time,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        age_rating: await returnRating(data),
        overview: data.overview,
        networks: data.networks,
    };
    return obj;
};

export { getShowsByName, getShowDetails };
