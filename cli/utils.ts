import { KeypressEvent } from '@inquirer/prompts';

const PARAM_REGEX = /\{\w+\}/g;

// Check if a given string contains any params
const hasParams = (s: string) => {
    const params = s.match(PARAM_REGEX);
    if (!params) return false;
    return true;
};

// Return the number of params in a given string
const numParams = (s: string) => {
    const params = s.match(PARAM_REGEX);
    if (!params) return 0;
    return params.length;
};

// Return a list of params in a given path
const getPathParams = (s: string) => {
    const matches = s.match(PARAM_REGEX) || [];
    return matches.map((match: string) => {
        return match.slice(1, match.length - 1);
    });
};

/**
 * Takes an array of API paths and returns a new array containing only paths
 * which use the given request type.
 * @param {Array<Array<T>>} paths
 * @param {'get' | 'post' | 'put' | 'delete'} reqType
 * @returns {Array<Array<T>>}
 */
const filterPathsByReqType = <T>(
    paths: Array<Array<T>>,
    reqType: 'get' | 'post' | 'put' | 'delete'
): Array<Array<T>> => {
    const filteredArray: Array<Array<T>> = [];
    for (let i = 0; i < paths.length; i++) {
        if (paths[i][1][reqType]) filteredArray.push(paths[i]);
    }
    return filteredArray;
};

/**
 * Check if a given key is a letter or number
 * @param {object} key ex: { sequence: 'a', name: 'a', ctrl: false, meta: false, shift: false }
 * @returns {boolean}
 */
const isAlphaNumeric = (key: KeypressEvent): boolean => {
    if (key.name && key.name.length === 1 && key.name.toLowerCase().match(/[a-z]|[0-9]/i)) {
        return true;
    }
    return false;
};

/**
 * To always render the search bar at 50 characters, this function
 * takes the search query and returns spaces to bring the total
 * character count to 50.
 * @param {string} search
 * @returns {string}
 */
const addSpaceToSearchBar = (search: string): string => {
    const diff = 50 - (search.length || 0);
    let spaces = '';
    for (let i = 0; i < diff; i++) {
        spaces += ' ';
    }
    return spaces;
};

/**
 * Make a GET request to The Movie DB API with a given endpoint
 * @param {string} path
 * @param {Array<{ param: string, value: string, path: boolean }>} params
 * @returns {Promise<object>}
 */
const fetchTMDB = async (
    path: string,
    params: Array<{ param: string; value: string; path: boolean }>
): Promise<object> => {
    const BASE_PATH = 'https://api.themoviedb.org';
    // eslint-disable-next-line no-undef
    const API_KEY = '?api_key=' + process.env.VITE_MOVIEDB_KEY;
    let PARAMS = '';
    if (params.length > 0) {
        for (let i = 0; i < params.length; i++) {
            if (!params[i].path) {
                PARAMS += `&${params[i].param}=${params[i].value}`;
            } else {
                path = path.replace(`{${params[i].param}}`, params[i].value);
            }
        }
    }
    const url = new URL(BASE_PATH + path + API_KEY + PARAMS);
    const res = await fetch(url);
    const json = await res.json();
    return json;
};

export {
    hasParams,
    numParams,
    getPathParams,
    filterPathsByReqType,
    isAlphaNumeric,
    addSpaceToSearchBar,
    fetchTMDB,
};
