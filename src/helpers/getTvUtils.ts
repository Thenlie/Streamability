import { ShowData, TvDetailsData, TvResults, ShowProviders } from '../types';

/**
 * This function is ran after the user enters a name of a TV Show.
 * @param name | Name of show being queried
 * @returns {Promise<ShowData[]>} | List of shows by searched query.
 */
const getTvByName = async (name: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    const data = (await response.json()) as TvResults;
    if (data.results) {
        return data.results.map((show) => {
            return {
                id: show.id,
                poster_path: show.poster_path,
                title: show.name,
                release_date: show.first_air_date,
                vote_average: show.vote_average,
                vote_count: show.vote_count,
                overview: show.overview,
            };
        });
    }
    return null;
};

/**
 * This function is ran for specific <ShowCard /> data with a TV Show ID.
 * @param id | MovieDB id of show being queried
 * @returns {Promise<ShowData>} | Specific data for a TV Show that is not originally supplied by getMoviesByName.
 */
const getTvDetails = async (id: number): Promise<ShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates,content_ratings`
    );
    const returnRating = (arr: TvDetailsData) => {
        for (let i = 0; i < arr.content_ratings.results.length; i++) {
            if (arr.content_ratings.results[i].iso_3166_1 === 'US') {
                return arr.content_ratings.results[i].rating;
            }
        }
        return 'No rating available';
    };
    const data = (await response.json()) as TvDetailsData;
    return {
        id: data.id,
        poster_path: data.poster_path,
        title: data.original_name,
        release_date: data.first_air_date,
        runtime: data.episode_run_time,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        age_rating: returnRating(data),
        overview: data.overview,
        networks: data.networks,
    };
};

/**
 * This function is ran for a specified movie to return streaming services with a TV Show ID.
 * @param id | MovieDB id of show being queried
 * @returns {Promise<ShowProviders>} | Returns list of streaming services
 */
const getTvProviders = async (id: number): Promise<ShowProviders> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    return response.json() as Promise<ShowProviders>;
};

/**
 * Get recommended TV shows based off of a movie
 * @param id | MovieDB id of TV show being searched for
 * @returns {Promise<ShowData[] | null>} | Array of recommended TV shows
 */
const getTvRecommendations = async (id: number): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    const data = (await response.json()) as TvResults;
    if (!data.results || data.results.length < 1) return null;
    const recommendations: ShowData[] = [];
    data.results.map((rec) =>
        recommendations.push({
            id: rec.id,
            overview: rec.overview,
            poster_path: rec.poster_path,
            release_date: rec.first_air_date,
            title: rec.name,
            vote_average: rec.vote_average,
            vote_count: rec.vote_count,
        })
    );
    console.log(JSON.stringify(recommendations));
    return recommendations;
};

export { getTvByName, getTvDetails, getTvProviders, getTvRecommendations };
