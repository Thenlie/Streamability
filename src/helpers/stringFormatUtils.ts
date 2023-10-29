import { ShowData } from '../types';

/**
 * Extremely basic string pluralize function.
 * If the number provided is one, the string is returned
 * If it is any other number, an 's' is appended to the string
 * @param n | value to check
 * @param s | singular string to update
 * @returns {string}
 */
const pluralizeString = (n: number, s: string): string => {
    if (n === 1) {
        return s;
    } else {
        return s + 's';
    }
};

/**
 * Get runtime if movie
 * Get number of seasons if TV
 * @param details | Details of show including runtime
 */
const getRuntime = (details: ShowData): string | null => {
    let str = null;
    if (details.media_type === 'movie' && details.runtime && details.runtime > 0) {
        str = `${details.runtime} ${pluralizeString(details.runtime, 'minute')}`;
    } else if (details.media_type === 'movie') {
        str = 'No runtime available';
    }

    if (details.media_type === 'tv' && details.seasons != undefined) {
        str = `${details.seasons.length} ${pluralizeString(details.seasons.length, 'season')}`;
    } else if (details.media_type === 'tv') {
        str = 'No seasons available';
    }

    return str;
};

export { pluralizeString, getRuntime };
