import Logger from '../logger';
import { ShowData, ShowResults } from '../types';

const LOG = new Logger('getShowUtils');

/**
 * Returns a list of shows based on a given search query.
 * @param name | Name of show being queried
 * @returns {Promise<ShowData[]>} | List of movies by searched query.
 */
const getShowsByName = async (name: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${name}&page=1&include_adult=false`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
    }
    const data = (await response.json()) as ShowResults;
    if (!data.results) {
        LOG.error('No results found');
        return null;
    }
    return data.results.map((show) => {
        return {
            id: show.id,
            poster_path: show.poster_path,
            title: show.title,
            release_date: show.release_date,
            vote_average: show.vote_average,
            vote_count: show.vote_count,
            overview: show.overview,
            media_type: show.media_type,
            genre_ids: show.genre_ids,
        };
    });
};

export { getShowsByName };
