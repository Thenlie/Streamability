import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchTMDB, filterPathsByReqType, getPathParams } from './utils.js';
import searchSelect from './searchSelect.js';
import { checkbox, input } from '@inquirer/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse The Movie DB's Open API schema
const json = JSON.parse(fs.readFileSync(`${__dirname}/data/tmdb_openapi.json`, 'utf-8'));

// Create path choices
const getReqPaths = filterPathsByReqType(Object.entries(json.paths), 'get');
const pathChoices = getReqPaths.map((path: object) => {
    return {
        name: path[0],
        value: path[0],
        description: path[1]['get'].description,
    };
});

const selectedPath = await searchSelect({
    message: 'Select a Movie DB API request',
    choices: pathChoices,
});

const params = json.paths[selectedPath].get.parameters.map((param) => {
    const req = param.required ? ' (required)' : '';
    return {
        name: param.name + req,
        value: param.name,
        checked: !!req,
    };
});

const selectedParamList: string[] = await checkbox({
    message: 'Select params to add',
    choices: params,
    loop: true,
});

const pathParams = getPathParams(selectedPath);
const selectedParams: {
    param: string;
    value: string;
    path: boolean;
}[] = [];
for (let i = 0; i < selectedParamList.length; i++) {
    const answer = await input({ message: selectedParamList[i] });
    const isInPath = pathParams.includes(selectedParamList[i]);
    selectedParams.push({ param: selectedParamList[i], value: answer, path: isInPath });
}

// eslint-disable-next-line no-console
console.log(await fetchTMDB(selectedPath, selectedParams));
