/**
 * Extremely basic string pluralize function.
 * If the number provided is one, the string is returns
 * If it is any other number, an 's' is appended to the string
 *
 * @param n | value to check
 * @param s | string to update
 * @returns {string}
 */
const pluralizeString = (n: number, s: string): string => {
    if (n === 1) {
        return s;
    } else {
        return s + 's';
    }
};

export { pluralizeString };
