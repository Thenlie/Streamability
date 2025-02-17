import { Season } from '../types';
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

/**
 * Returns valid list of seasons by removing untraditional entries provided by TMDB
 * I.E. 'Specials' and unreleased seasons
 * @param seasons
 * @returns {Season[]}
 */
const validateSeasons = (seasons: Season[]): Season[] => {
    return seasons.filter((item) => item.season_number != 0 && item.air_date);
};

export { validateCountryCode, validateCountry, emailRegex, validateSeasons };
