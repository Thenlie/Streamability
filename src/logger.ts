/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

/**
 * Custom logger that wraps native console.log.
 * Removes logs from production and adds some additional formatting.
 */
export default class Logger {
    prefix: string;

    constructor(logName = 'streamability') {
        this.prefix = `[${logName}] `;
    }

    error(message?: any, ...otherMessages: any[]) {
        if (!import.meta.env.DEV) return;
        const log = '%c ERROR ' + this.prefix + message;
        console.log(log, 'background: firebrick; color: white', ...otherMessages);
    }

    warn(message?: any, ...otherMessages: any[]) {
        if (!import.meta.env.DEV) return;
        const log = '%c WARN  ' + this.prefix + message;
        console.log(log, 'background: gold; color: black', ...otherMessages);
    }

    debug(message?: any, ...otherMessages: any[]) {
        if (!import.meta.env.DEV) return;
        const log = '%c DEBUG ' + this.prefix + message;
        console.log(log, 'background: lightskyblue; color: black', ...otherMessages);
    }

    json(message?: any, ...otherMessages: any[]) {
        if (!import.meta.env.DEV) return;
        const log = '%c DEBUG ' + this.prefix + JSON.stringify(message);
        console.log(log, 'background: lightskyblue; color: black', ...otherMessages);
    }
}
