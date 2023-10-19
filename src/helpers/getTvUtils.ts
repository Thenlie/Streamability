import Logger from '../logger';
import { ShowData, TvDetailsData, TvResults, ShowProviders, DiscoverTv } from '../types';

const LOG = new Logger('getTvUtils');

/**
 * Returns a list of tv shows based on a given search query.
 * @param name | Name of tv show being queried
 * @returns {Promise<ShowData[]>} | List of tv shows
 */
const getTvByName = async (name: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as TvResults;
    if (!data.results) return null;
    return data.results.map((tv) => {
        return {
            id: tv.id,
            poster_path: tv.poster_path,
            title: tv.name,
            release_date: tv.first_air_date,
            vote_average: tv.vote_average,
            vote_count: tv.vote_count,
            overview: tv.overview,
            media_type: 'tv',
            genre_ids: tv.genre_ids,
        };
    });
};

/**
 * Returns more detailed information about a given movie.
 * @param id | MovieDB id of tv show being queried
 * @returns {Promise<ShowData>} | TV details
 */
const getTvDetails = async (id: number): Promise<ShowData> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&append_to_response=images,release_dates,content_ratings`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
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
        runtime: data.episode_run_time[0],
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        age_rating: returnRating(data),
        overview: data.overview,
        networks: data.networks,
        media_type: 'tv',
        genre_ids: data.genres.map((genre) => genre.id),
    };
};

/**
 * Returns a list of streaming providers for a given tv show.
 * @param id | MovieDB id of tv show being queried
 * @returns {Promise<ShowProviders>} | List of streaming services
 */
const getTvProviders = async (id: number): Promise<ShowProviders> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    return response.json() as Promise<ShowProviders>;
};

/**
 * Returns a list of trending tv shows.
 * @returns {Promise<ShowData>} | Trending TV shows
 */
const getTvTrending = async (): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_MOVIEDB_KEY}`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as TvResults;
    if (!data.results) return null;
    return data.results.map((tv) => {
        return {
            id: tv.id,
            poster_path: tv.poster_path,
            banner_path: tv.backdrop_path,
            title: tv.original_name,
            release_date: tv.first_air_date,
            vote_average: tv.vote_average,
            vote_count: tv.vote_count,
            overview: tv.overview,
            media_type: 'tv',
            genre_ids: tv.genre_ids,
        };
    });
};

/**
 * Returns recommended tv shows based off of a given tv show
 * @param id | MovieDB id of TV show being searched for
 * @returns {Promise<ShowData[] | null>} | Array of recommended TV shows
 */
const getTvRecommendations = async (id: number): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
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
            media_type: 'tv',
            genre_ids: rec.genre_ids,
        })
    );
    return recommendations;
};

/**
 * Returns Tv Shows based on parameters provided
 * @param include_adult
 * @param pages
 * @param with_genres | String of genre IDs, can be a comma (AND) or pipe (OR) separated query
 * @param sort_by | defaults to 'popularity.desc'
 * @param vote_average_lte
 * @param vote_average_gte
 * @param vote_count_gte
 * @param vote_count_lte
 * @param first_air_date_gte | Greater or Equal To YYYY-MM-DD
 * @param first_air_date_lte | Less or Equal To YYYY-MM-DD
 * @param with_watch_providers | String of Provider IDs, can be a comma (AND) or pipe (OR) separated query
 * @param watch_region
 * @returns {Promise<ShowData[] | null>} | Array of discovered Tv
 */
const getDiscoverTv = async (params: DiscoverTv): Promise<ShowData[] | null> => {
    let url = `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_MOVIEDB_KEY
    }&include_adult=${params.include_adult}&language=en-US&page=${params.pages}&region=us`;

    if (params.with_genres) url += `&with_genres=${params.with_genres}`;
    if (params.sort_by) url += `&sort_by=${params.sort_by}`;
    if (params.vote_average_lte) url += `&vote_average.lte=${params.vote_average_lte}`;
    if (params.vote_average_gte) url += `&vote_average.gte=${params.vote_average_gte}`;
    if (params.vote_count_gte) url += `&vote_count.gte=${params.vote_count_gte}`;
    if (params.vote_count_lte) url += `&vote_count.lte=${params.vote_count_lte}`;
    if (params.first_air_date_gte) url += `&release_date.gte=${params.first_air_date_gte}`;
    if (params.first_air_date_lte) url += `&release_date.lte=${params.first_air_date_lte}`;
    if (params.with_watch_providers) url += `&with_watch_providers=${params.with_watch_providers}`;
    if (params.watch_region) url += `&watch_region=${params.watch_region}`;

    const response = await fetch(url);

    const data = (await response.json()) as TvResults;
    if (!data.results || data.results.length < 1) return null;
    return data.results.map((tv) => {
        return {
            id: tv.id,
            overview: tv.overview,
            poster_path: tv.poster_path,
            release_date: tv.first_air_date,
            title: tv.name,
            vote_average: tv.vote_average,
            vote_count: tv.vote_count,
            media_type: 'tv',
            genre_ids: tv.genre_ids,
        };
    });
};

export {
    getTvByName,
    getTvDetails,
    getTvTrending,
    getTvProviders,
    getTvRecommendations,
    getDiscoverTv,
};
