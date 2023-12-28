import 'dotenv/config';
import fs, { WriteFileOptions } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchTMDB, filterPathsByReqType, getPathParams } from './utils.js';
import searchSelect from './searchSelect.js';
import { checkbox, input } from '@inquirer/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Props {
    outputFile: string | undefined;
    inputFile: string;
    request: string | undefined;
    useDefault: boolean;
}

export const main = async ({ outputFile, inputFile, request, useDefault }: Props) => {
    // Parse The Movie DB's Open API schema
    const json = JSON.parse(fs.readFileSync(`${__dirname}/${inputFile}`, 'utf8'));

    // Create path choices
    const getReqPaths = filterPathsByReqType(Object.entries(json.paths), 'get');
    const pathChoices = getReqPaths.map((path: object) => {
        return {
            name: path[0],
            value: path[0],
            description: path[1]['get'].description,
        };
    });

    // Get user selected path
    const selectedPath = await searchSelect({
        message: 'Select a Movie DB API request',
        choices: pathChoices,
    });

    // Get list of params for selected path
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
    const pathParams = getPathParams(selectedPath);
    const selectedParams: Array<{
        param: string;
        value: string;
        path: boolean;
    }> = [];
    for (let i = 0; i < selectedParamList.length; i++) {
        const answer = await input({ message: selectedParamList[i] });
        const isInPath = pathParams.includes(selectedParamList[i]);
        selectedParams.push({ param: selectedParamList[i], value: answer, path: isInPath });
    }

    // Make fetch request and print output
    const data = JSON.stringify(await fetchTMDB(selectedPath, selectedParams), null, 4);
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
