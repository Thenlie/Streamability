import Logger from '../logger';
import {
    ShowData,
    TvDetailsData,
    ShowProviders,
    DiscoverTv,
    TvData,
    SeasonDetails,
    EpisodeDetails,
    TvResults,
} from '../types';
import { convertDetailsToShowType, convertResultsToShowType } from './showTypeUtils';
import { TMDB_API_PATH } from './constants';
import { makeFetchRequest } from './fetch';

const LOG = new Logger('getTvUtils');

/**
 * Returns a list of tv shows based on a given search query.
 * @param name | Name of tv show being queried
 * @returns {Promise<ShowData[]>} | List of tv shows
 */
const getTvByName = async (name: string): Promise<ShowData[] | null> => {
    const data = await makeFetchRequest<TvResults>(
        `${TMDB_API_PATH}search/tv?language=en-US&query=${name}&page=1&include_adult=false`,
        LOG
    );
    if (!data?.results) return null;
    return convertResultsToShowType(data);
};

/**
 * Returns more detailed information about a given movie.
 * @param id | MovieDB id of tv show being queried
 * @returns {Promise<ShowData>} | TV details
 */
const getTvDetails = async (id: number): Promise<ShowData | null> => {
    const data = await makeFetchRequest<TvDetailsData>(
        `${TMDB_API_PATH}tv/${id}?append_to_response=images,release_dates,content_ratings,watch/providers,credits`,
        LOG
    );
    if (!data) return null;
    return convertDetailsToShowType(data, 'tv');
};

/**
 * Returns a list of streaming providers for a given tv show.
 * @param id | MovieDB id of tv show being queried
 * @returns {Promise<ShowProviders>} | List of streaming services
 */
const getTvProviders = async (id: number): Promise<ShowProviders | null> => {
    const data = await makeFetchRequest<ShowProviders>(
        `${TMDB_API_PATH}tv/${id}/watch/providers?`,
        LOG
    );
    return data;
};

/**
 * Returns a list of trending tv shows.
 * @returns {Promise<ShowData>} | Trending TV shows
 */
const getTvTrending = async (): Promise<ShowData[] | null> => {
    const data = await makeFetchRequest<TvResults>(`${TMDB_API_PATH}tv/popular?`, LOG);
    if (!data?.results) return null;
    return convertResultsToShowType(data);
};

/**
 * Returns recommended tv shows based off of a given tv show
 * @param id | MovieDB id of TV show being searched for
 * @returns {Promise<ShowData[] | null>} | Array of recommended TV shows
 */
const getTvRecommendations = async (id: number): Promise<ShowData[] | null> => {
    const data = await makeFetchRequest<TvResults>(
        `${TMDB_API_PATH}tv/${id}/recommendations?`,
        LOG
    );
    if (!data?.results || data.results.length < 1) return null;
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
    let url = `${TMDB_API_PATH}discover/tv?include_adult=${include_adult}&language=en-US&page=${params.pages}&region=us`;

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

    const data = await makeFetchRequest<TvResults>(url, LOG);

    if (!data?.results || data.results.length < 1) return null;

    const dataWithType: TvData[] = data.results.map((d: TvData) => ({ ...d, media_type: 'tv' }));
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
const getTvSeasonDetails = async (
    showId: number,
    season_num: number
): Promise<SeasonDetails | null> => {
    const data = await makeFetchRequest<SeasonDetails>(
        `${TMDB_API_PATH}tv/${showId}/season/${season_num}?`,
        LOG
    );
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
): Promise<EpisodeDetails | null> => {
    const data = await makeFetchRequest<EpisodeDetails>(
        `${TMDB_API_PATH}tv/${showId}/season/${season_num}/episode/${episode_num}?append_to_response=images,videos,credits`,
        LOG
    );
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
