import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { filterPathsByReqType, getPathParams, validatePath } from './utils.js';
import searchSelect from './searchSelect.js';
import { checkbox, input } from '@inquirer/prompts';
import { makeRequest } from './fetch.js';
import { DEFAULT_PARAMS } from './lib/params.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Props {
    outputFile: string | undefined;
    inputFile: string;
    inputPath: string | undefined;
    useDefaults: boolean;
}

export const main = async ({ outputFile, inputFile, inputPath, useDefaults }: Props) => {
    // Parse The Movie DB's Open API schema
    const json = JSON.parse(fs.readFileSync(`${__dirname}/${inputFile}`, 'utf8'));

    // Create path choices
    const getReqPaths = filterPathsByReqType(Object.entries(json.paths), 'get');

    // Get user selected path
    let selectedPath: string;
    if (inputPath) {
        const isValid = validatePath(inputPath, getReqPaths.map((path) => path[0]) as string[]);
        if (!isValid) throw new Error(`Invalid path ${inputPath}!`);
        selectedPath = inputPath;
    } else {
        const pathChoices = getReqPaths.map((path: object) => {
            return {
                name: path[0],
                value: path[0],
                description: path[1]['get'].description,
            };
        });
        selectedPath = await searchSelect({
            message: 'Select a Movie DB API request',
            choices: pathChoices,
        });
    }

    // Create list of user selected OR default query parameters
    const selectedParams: Array<{
        param: string;
        value: string;
        path: boolean;
    }> = [];
    const pathParams = getPathParams(selectedPath);
    if (!useDefaults) {
        // Get list of all params for selected path
        const params = json.paths[selectedPath].get.parameters.map((param) => {
            const req = param.required ? ' (required)' : '';
            return {
                name: param.name + req,
                value: param.name,
                checked: !!req,
            };
        });

        // Get user selected params
        const selectedParamList: string[] = await checkbox({
            message: 'Select params to add',
            choices: params,
            loop: true,
        });

        // Prompt user for each selected param
        for (let i = 0; i < selectedParamList.length; i++) {
            const answer = await input({ message: selectedParamList[i] });
            const isInPath = pathParams.includes(selectedParamList[i]);
            selectedParams.push({ param: selectedParamList[i], value: answer, path: isInPath });
        }
    } else {
        // Get default path params
        for (let i = 0; i < pathParams.length; i++) {
            const defaultParam = DEFAULT_PARAMS.find((param) => param.name === pathParams[i]);
            if (defaultParam) {
                selectedParams.push({
                    param: pathParams[i],
                    value: defaultParam.values[Math.round(Math.random())],
                    path: true,
                });
            }
        }
    }

    await makeRequest({ path: selectedPath, params: selectedParams, outputFile });
};
