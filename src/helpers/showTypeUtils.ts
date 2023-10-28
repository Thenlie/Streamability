/* eslint-disable prettier/prettier */
import {
    MovieData,
    MovieDetailsData,
    MovieResults,
    ShowData,
    ShowResults,
    TvData,
    TvDetailsData,
    TvResults,
} from '../types';
import { getMovieRating } from './getMovieUtils';
import { getTvRating } from './getTvUtils';
import { filterShowsByType } from './showFilterUtils';

/**
 * Convert movie or tv results to the ShowData type.
 * @param data | Results data being converted
 * @returns {ShowData[] | null}
 */
const convertResultsToShowType = (
    data: MovieResults | TvResults | ShowResults
): ShowData[] | null => {
    if (!data || !data.results) return null;

    const showData = data.results.map((show) => {
        return {
            id: show.id,
            poster_path: show.poster_path,
            banner_path: show.backdrop_path,
            vote_average: show.vote_average,
            vote_count: show.vote_count,
            overview: show.overview,
            media_type: show.media_type,
            genre_ids: show.genre_ids,
            title: show.media_type === 'movie' ? (show as MovieData).title : (show as TvData).name,
            release_date:
                show.media_type === 'movie'
                    ? (show as MovieData).release_date
                    : (show as TvData).first_air_date
        };
    });

    return filterShowsByType(showData, 'both');
};

/**
 * Convert movie or tv details to the ShowData type.
 * @param data | Details data being converted
 * @param mediaType | Type of details being converted
 * @returns {ShowData[] | null}
 */
const convertDetailsToShowType = (data: MovieDetailsData | TvDetailsData, mediaType: 'movie' | 'tv'): ShowData => {
    return {
        id: data.id,
        poster_path: data.poster_path,
        vote_average: data.vote_average,
        vote_count: data.vote_count,
        overview: data.overview,
        media_type: mediaType,
        genre_ids: data.genres.map((genre) => genre.id),
        age_rating:
            mediaType === 'movie'
                ? getMovieRating(data as MovieDetailsData)
                : getTvRating(data as TvDetailsData),
        title:
            mediaType === 'movie'
                ? (data as MovieDetailsData).original_title
                : (data as TvDetailsData).original_name,
        release_date:
            mediaType === 'movie'
                ? (data as MovieDetailsData).release_date
                : (data as TvDetailsData).first_air_date,
        runtime:
            mediaType === 'movie'
                ? (data as MovieDetailsData).runtime
                : (data as TvDetailsData).episode_run_time[0],
        providers:
            data['watch/providers'].results.US?.flatrate?.map((provider) => {
                return {
                    name: provider.provider_name,
                    id: provider.provider_id,
                    logo_path: provider.logo_path,
                    origin_country: 'US'
                };
            }),
        seasons: mediaType === 'movie'
            ? null
            : (data as TvDetailsData).seasons,
        end_date: mediaType === 'movie'
            ? null
            : (data as TvDetailsData).last_episode_to_air.air_date,
        next_air_date: mediaType === 'movie'
            ? null
            : (data as TvDetailsData).next_episode_to_air?.[0].air_date
    };
};

export { convertResultsToShowType, convertDetailsToShowType };
