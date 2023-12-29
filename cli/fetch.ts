import fs, { WriteFileOptions } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MakeRequestProps {
    path: string;
    params: Array<{
        param: string;
        value: string;
        path: boolean;
    }>;
    outputFile: string | undefined;
}

/**
 * Helper function to make fetch request to TMDB and handle output
 */
const makeRequest = async ({ path, params, outputFile }: MakeRequestProps) => {
    // Make fetch request and print output
    const data = JSON.stringify(await fetchTMDB(path, params), null, 4);
    if (outputFile) {
        try {
            const writeOptions: WriteFileOptions = {
                encoding: 'utf8',
                // the value 0o666 sets the file to be readable and writable by everyone but not executable
                mode: 0o666,
                flag: 'w',
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fs.writeFileSync(`${__dirname}/${outputFile}`, data, writeOptions);
            // eslint-disable-next-line no-console
            console.log('File written successfully!');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Failed to write file!', err);
        }
    } else {
        // eslint-disable-next-line no-console
        console.log(data);
    }
};

/**
 * Make a GET request to The Movie DB API with a given endpoint
 * @todo make this method generic and move BASE_PATH and API_KEY to a config file
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
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${String(url)}. Status: ${res.statusText}`);
    }
    const json = await res.json();
    return json;
};

export { makeRequest, fetchTMDB };
