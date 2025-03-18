import { describe, expect, it } from 'vitest';
import { validateCountry, validateCountryCode } from '../validationUtils';

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
