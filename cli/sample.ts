#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { main } from '.';

yargs(hideBin(process.argv))
    .command(
        'run',
        'run the CLI tool',
        () => {},
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (argv) => {
            main();
        }
    )
    .options({
        o: {
            alias: 'output',
            // demandOption: true,
            default: 'stdio',
            describe: 'Filename to write response to',
            type: 'string',
        },
        i: {
            alias: 'input',
            default: './data/tmdb_openapi.json',
            describe: 'Filename to read open api spec from',
            type: 'string',
        },
        r: {
            alias: 'request',
            describe: 'TMDB endpoint to be requested',
            type: 'string',
        },
        d: {
            alias: 'default',
            describe: 'If the request should use default values and bypass param entry',
            type: 'boolean',
        },
    })
    .demandCommand(1)
    .parse();
