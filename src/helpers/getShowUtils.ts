import Logger from '../logger';
import { ShowData, ShowResults } from '../types';
import { convertResultsToShowType } from './showTypeUtils';
import { TMDB_API_PATH } from './constants';
import { makeFetchRequest } from './fetch';

const LOG = new Logger('getShowUtils');

/**
 * Returns a list of shows based on a given search query.
 * @param query | Name of show being queried
 * @returns {Promise<ShowData[]>} | List of movies by searched query.
 */
const getShowsByName = async (query: string): Promise<ShowData[] | null> => {
    const data = await makeFetchRequest<ShowResults>(
        `${TMDB_API_PATH}search/multi?language=en-US&query=${query}&page=1&include_adult=false`,
        LOG
    );
    if (!data?.results) {
        LOG.error('No results found');
        return null;
    }

    return convertResultsToShowType(data);
};

export { getShowsByName };
