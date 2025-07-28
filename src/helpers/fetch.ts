import Logger from '../logger';

/**
 * Generic fetch request that appends the TMDB API key and handles errors
 * If you path does not contain query params, it must end with a '?'
 */
const makeFetchRequest = async <T>(path: string, LOG: Logger): Promise<T | null> => {
    try {
        const response = await fetch(path + `&api_key=${import.meta.env.VITE_MOVIEDB_KEY}`);
        if (!response.ok) {
            LOG.error('Fetch request failed with a status of ' + response.status);
            return null;
        }
        try {
            const data: T = await response.json();
            return data;
        } catch (error) {
            LOG.error('JSON parse failed:' + (error as Error).message);
            return null;
        }
    } catch (error) {
        LOG.error('Network error:' + (error as Error).message);
        return null;
    }
};

export { makeFetchRequest };
