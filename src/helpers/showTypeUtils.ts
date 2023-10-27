import { MovieData, MovieResults, ShowData, ShowResults, TvData, TvResults } from '../types';
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

    const showData = data.results.map((movie) => {
        return {
            id: movie.id,
            poster_path: movie.poster_path,
            banner_path: movie.backdrop_path,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count,
            overview: movie.overview,
            media_type: movie.media_type,
            genre_ids: movie.genre_ids,
            title:
                movie.media_type === 'movie' ? (movie as MovieData).title : (movie as TvData).name,
            release_date:
                movie.media_type === 'movie'
                    ? (movie as MovieData).release_date
                    : (movie as TvData).first_air_date,
        };
    });

    return filterShowsByType(showData, 'both');
};

export { convertResultsToShowType };
