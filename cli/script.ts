import json from './tmdb_openapi.json' assert { type: 'json' };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PATHS = Object.keys((json as any).paths);
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

for (let i = 0; i < PATHS.length; i++) {
    console.log(numParams(PATHS[i]));
}
