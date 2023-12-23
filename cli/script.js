import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import chalk from 'chalk';
// import { input } from '@inquirer/prompts';
// import { createPrompt, useState, useKeypress, isEnterKey, usePrefix } from '@inquirer/core';
import { filterPathsByReqType } from './utils.js';
import searchSelect from './searchSelect.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse The Movie DB's Open API schema
let json = JSON.parse(fs.readFileSync(`${__dirname}/tmdb_openapi.json`, 'utf-8'));

const PATHS = Object.keys(json.paths);
// Create path choices
const getReqPaths = filterPathsByReqType(Object.entries(json.paths), 'get');
const pathChoices = getReqPaths.map((path) => {
    return {
        name: path[0],
        value: path[0],
        description: path[1]['get'].description,
    };
});

// Which then can be used like this:
const answer = await searchSelect({
    message: 'Select a Movie DB API request',
    choices: pathChoices,
});

console.log(answer);

// console.log(filterPathsByReqType(Object.entries(json.paths), 'get'));

// for (let i = 0; i < PATHS.length; i++) {
//     console.log(numParams(PATHS[i]));
// }
