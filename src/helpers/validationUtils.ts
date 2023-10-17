import { COUNTRIES } from './constants';

/**
 * Returns `true` when the provided country code is a valid
 * and supported code, otherwise returns `false`.
 * @param country | 2 digit country code
 * @returns {boolean}
 */
const validateCountryCode = (country: string): boolean => {
    if (country.length !== 2) return false;
    return !!COUNTRIES.find((c) => c.abbrev === country);
};

export { validateCountryCode };
