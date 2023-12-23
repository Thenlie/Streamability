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

export { hasParams, numParams, filterPathsByReqType };
