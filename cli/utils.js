const PARAM_REGEX = /\{\w+\}/g;

// Check if a given string contains any params
const hasParams = (s) => {
    const params = s.match(PARAM_REGEX);
    if (!params) return false;
    return true;
};

// Return the number of params in a given string
const numParams = (s) => {
    const params = s.match(PARAM_REGEX);
    if (!params) return 0;
    return params.length;
};

/**
 * Takes an array of API paths and returns a new array containing only paths
 * which use the given request type.
 * @param {Array<Array<string, object>>} paths
 * @param {'get' | 'post' | 'put' | 'delete'} reqType
 * @returns {Array<Array<string, object>>}
 */
const filterPathsByReqType = (paths, reqType) => {
    const filteredArray = [];
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
const isAlphaNumeric = (key) => {
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
const addSpaceToSearchBar = (search) => {
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
 * @returns {Promise<object>}
 */
const fetchTMDB = async (path) => {
    const BASE_PATH = 'https://api.themoviedb.org';
    // eslint-disable-next-line no-undef
    const apiKey = '?api_key=' + process.env.VITE_MOVIEDB_KEY;
    const res = await fetch(BASE_PATH + path + apiKey);
    const json = await res.json();
    return json;
};

export {
    hasParams,
    numParams,
    filterPathsByReqType,
    isAlphaNumeric,
    addSpaceToSearchBar,
    fetchTMDB,
};
