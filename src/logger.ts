/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { ErrorResponse } from '@remix-run/router';

/* eslint-disable no-console */
export default class Logger {
    prefix: string;

    constructor(logName = 'streamability') {
        this.prefix = `[${logName}] `;
    }

    error(message: string | number | AuthError | ErrorResponse | PostgrestError) {
        if (!import.meta.env.DEV) return;
        const log = '%c ERROR ' + this.prefix + message;
        console.log(log, 'background: firebrick; color: white');
    }

    warn(message: string | number) {
        if (!import.meta.env.DEV) return;
        const log = '%c WARN  ' + this.prefix + message;
        console.log(log, 'background: gold; color: black');
    }

    debug(message: any, ...rest: any) {
        if (!import.meta.env.DEV) return;
        const log = '%c DEBUG ' + this.prefix + message;
        console.log(log, 'background: lightskyblue; color: black', ...rest);
    }

    json(message: string | number) {
        if (!import.meta.env.DEV) return;
        const log = '%c DEBUG ' + this.prefix + JSON.stringify(message);
        console.log(log, 'background: lightskyblue; color: black');
    }
}
