import { describe, expect, it } from 'vitest';
import { validateCountry, validateCountryCode, validateSeasons } from '../validationUtils';
import { SEASONS_VALID, SEASON_INVALID } from './constants';

describe('validateCountryCode', () => {
    it('properly validates valid country codes', () => {
        expect(validateCountryCode('US')).toBe(true);
        expect(validateCountryCode('CA')).toBe(true);
        expect(validateCountryCode('FR')).toBe(true);
        expect(validateCountryCode('RU')).toBe(true);
    });
    it('properly validates invalid country codes', () => {
        expect(validateCountryCode('ZZZ')).toBe(false);
        expect(validateCountryCode('ZF')).toBe(false);
        expect(validateCountryCode('11')).toBe(false);
        expect(validateCountryCode('AA')).toBe(false);
    });
});

describe('validateCountryC', () => {
    it('properly validates valid countries', () => {
        expect(validateCountry('United States of America')).toBe(true);
        expect(validateCountry('Canada')).toBe(true);
        expect(validateCountry('France')).toBe(true);
        expect(validateCountry('Russia')).toBe(true);
    });
    it('properly validates invalid countries', () => {
        expect(validateCountry('USA')).toBe(false);
        expect(validateCountry('UK')).toBe(false);
        expect(validateCountry('Russsia')).toBe(false);
        expect(validateCountry('invalid')).toBe(false);
    });
});

describe('validateSeasons', () => {
    it('returns provided array if no invalid seasons are found', () => {
        expect(validateSeasons(SEASONS_VALID).length).toBe(SEASONS_VALID.length);
    });
    it('properly removes specials seasons, unreleased seasons, or both', () => {
        expect(validateSeasons([...SEASONS_VALID, SEASON_INVALID[0]]).length).toBe(
            SEASONS_VALID.length
        );
        expect(validateSeasons([...SEASONS_VALID, SEASON_INVALID[1]]).length).toBe(
            SEASONS_VALID.length
        );
        expect(
            validateSeasons([...SEASONS_VALID, SEASON_INVALID[0], SEASON_INVALID[1]]).length
        ).toBe(SEASONS_VALID.length);
    });
});
