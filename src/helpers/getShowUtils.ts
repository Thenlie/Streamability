import Logger from '../logger';
import { ShowData, ShowResults } from '../types';
import { convertResultsToShowType } from './showTypeUtils';

const LOG = new Logger('getShowUtils');

/**
 * Returns a list of shows based on a given search query.
 * @param query | Name of show being queried
 * @returns {Promise<ShowData[]>} | List of movies by searched query.
 */
const getShowsByName = async (query: string): Promise<ShowData[] | null> => {
    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${
            import.meta.env.VITE_MOVIEDB_KEY
        }&language=en-US&query=${query}&page=1&include_adult=false`
    );
    if (!response.ok) {
        LOG.error('Fetch request failed with a status of ' + response.status);
        return null;
    }

    const data = (await response.json()) as ShowResults;
    if (!data.results) {
        LOG.error('No results found');
        return null;
    }

    return convertResultsToShowType(data);
};

export { getShowsByName };
