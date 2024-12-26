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

/**
 * Returns `true` when the provided country is valid
 * and supported, otherwise returns `false`.
 * @param country | country name
 * @returns {boolean}
 */
const validateCountry = (country: string): boolean => {
    return !!COUNTRIES.find((c) => c.country === country);
};

const emailRegex = /^([\w.+-]+)@([\w-]+\.)+([\w]{2,})$/gm;

export { validateCountryCode, validateCountry, emailRegex };
