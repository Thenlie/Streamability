import { describe, expect, it } from 'vitest';
import { validateCountryCode } from '../validationUtils';

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
