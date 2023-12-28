#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Props, main } from '.';

yargs(hideBin(process.argv))
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
        r: {
            alias: 'request',
            describe: 'TMDB endpoint to be requested',
            type: 'string',
        },
        d: {
            alias: 'useDefault',
            describe: 'If the request should use default values and bypass param entry',
            type: 'boolean',
        },
    })
    .command(
        'run',
        'run the CLI tool',
        () => {},
        (argv) => {
            const { outputFile, inputFile, request, useDefault } = argv as unknown as Props;
            main({ outputFile, inputFile, request, useDefault });
        }
    )
    .demandCommand(1)
    .parse();
