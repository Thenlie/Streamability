import { describe, expect, it } from 'vitest';
import { pluralizeString } from '../stringFormatUtils';

describe('pluralizeString', () => {
    // eslint-disable-next-line prettier/prettier
    it('properly formats the string \'rating\'', () => {
        expect(pluralizeString(0, 'rating')).toBe('ratings');
        expect(pluralizeString(1, 'rating')).toBe('rating');
        expect(pluralizeString(2, 'rating')).toBe('ratings');
        expect(pluralizeString(3, 'rating')).toBe('ratings');
        expect(pluralizeString(100, 'rating')).toBe('ratings');
    });
});
