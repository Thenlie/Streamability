#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Props, main } from '.';

const yargsInstance = yargs(hideBin(process.argv));

yargsInstance
    .options({
        o: {
            alias: 'outputFile',
            default: 'stdio',
            describe: 'Filename to write response to',
            type: 'string',
        },
        i: {
            alias: 'inputFile',
            default: 'data/tmdb_openapi.json',
            describe: 'Filename to read open api spec from',
            type: 'string',
        },
        p: {
            alias: 'inputPath',
            describe: 'TMDB endpoint to be requested',
            type: 'string',
        },
        d: {
            alias: 'useDefaults',
            describe: 'If the request should use default values and bypass param entry',
            type: 'boolean',
        },
    })
    .command(
        'run',
        'run the CLI tool',
        () => {},
        (argv) => {
            const { outputFile, inputFile, inputPath, useDefaults } = argv as unknown as Props;
            main({ outputFile, inputFile, inputPath, useDefaults });
        }
    )
    .wrap(yargsInstance.terminalWidth())
    .demandCommand(1)
    .parse();
