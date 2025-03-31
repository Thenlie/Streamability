import Logger from '../logger';
import {
    ShowData,
    TvDetailsData,
    TvResults,
    ShowProviders,
    DiscoverTv,
    TvData,
    SeasonDetails,
    EpisodeDetails,
} from '../types';
import { convertDetailsToShowType, convertResultsToShowType } from './showTypeUtils';

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
    return convertResultsToShowType(data);
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
        }&append_to_response=images,release_dates,content_ratings,watch/providers,credits`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }

    const data = (await response.json()) as TvDetailsData;
    return convertDetailsToShowType(data, 'tv');
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
    return convertResultsToShowType(data);
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
    return convertResultsToShowType(data);
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
const getDiscoverTv = async ({
    include_adult = false,
    ...params
}: DiscoverTv): Promise<ShowData[] | null> => {
    let url = `https://api.themoviedb.org/3/discover/tv?api_key=${
        import.meta.env.VITE_MOVIEDB_KEY
    }&include_adult=${include_adult}&language=en-US&page=${params.pages}&region=us`;

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
    const dataWithType: TvData[] = data.results.map((d) => ({ ...d, media_type: 'tv' }));
    data.results = dataWithType;
    return convertResultsToShowType(data);
};

/**
 * Return the age rating of a given TV show or 'No rating available'
 * if the rating can not be found
 */
const getTvRating = (arr: TvDetailsData) => {
    for (let i = 0; i < arr.content_ratings.results.length; i++) {
        if (arr.content_ratings.results[i].iso_3166_1 === 'US') {
            return arr.content_ratings.results[i].rating;
        }
    }
    return 'No rating available';
};

/**
 * Provides more details of an individual season
 * @param showId
 * @param season_num
 * @returns {Promise<SeasonDetails>}
 */
const getTvSeasonDetails = async (showId: number, season_num: number): Promise<SeasonDetails> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}/season/${season_num}?api_key=${import.meta.env.VITE_MOVIEDB_KEY}`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data: SeasonDetails = await response.json();
    return data;
};

/**
 * Provides additional Episode details that are not provided by Season Details
 * @param showId
 * @param season_num
 * @param episode_num
 * @returns {Promise<EpisodeDetails>}
 */
const getTvEpisodeDetails = async (
    showId: number,
    season_num: number,
    episode_num: number
): Promise<EpisodeDetails> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}/season/${season_num}/episode/${episode_num}?api_key=${import.meta.env.VITE_MOVIEDB_KEY}&append_to_response=images,videos,credits`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data: EpisodeDetails = await response.json();
    return data;
};

export {
    getTvByName,
    getTvDetails,
    getTvTrending,
    getTvProviders,
    getTvRecommendations,
    getDiscoverTv,
    getTvRating,
    getTvSeasonDetails,
    getTvEpisodeDetails,
};
