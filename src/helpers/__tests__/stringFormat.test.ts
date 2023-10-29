import { describe, expect, it } from 'vitest';
import { getRuntime, pluralizeString } from '../stringFormatUtils';
import { SHOW_DATA_ARRAY } from './constants';

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

describe('getRuntime', () => {
    it('return the properly formatted release date for a movie', () => {
        expect(getRuntime(SHOW_DATA_ARRAY[0])).toBe('126 minutes');
        expect(getRuntime(SHOW_DATA_ARRAY[1])).toBe('88 minutes');
        expect(getRuntime(SHOW_DATA_ARRAY[2])).toBe('No runtime available');
        expect(getRuntime(SHOW_DATA_ARRAY[3])).toBe('No runtime available');
    });
    it('return the properly formatted release date for a tv show', () => {
        expect(getRuntime(SHOW_DATA_ARRAY[20])).toBe('2 seasons');
        expect(getRuntime(SHOW_DATA_ARRAY[21])).toBe('4 seasons');
        expect(getRuntime(SHOW_DATA_ARRAY[22])).toBe('No seasons available');
        expect(getRuntime(SHOW_DATA_ARRAY[23])).toBe('No seasons available');
    });
});
