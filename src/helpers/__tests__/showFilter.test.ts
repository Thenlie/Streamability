import { describe, expect, it } from 'vitest';
import {
    filterShowsByGenre,
    filterShowsByReleasedAfter,
    filterShowsByReleasedBefore,
    filterShowsByReleasedBetween,
    filterShowsByType,
} from '../showFilterUtils';
import { SHOW_DATA_ARRAY } from './constants';

describe('filterShowsByGenre', () => {
    it('properly filters shows based on a specified genre id', () => {
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 18).length).toBe(9);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 28).length).toBe(15);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 10752).length).toBe(1);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 1).length).toBe(0);
    });
});

describe('filterShowsByType', () => {
    it('properly filters shows based on a specified genre id', () => {
        expect(filterShowsByType(SHOW_DATA_ARRAY, 'movie').length).toBe(20);
        expect(filterShowsByType(SHOW_DATA_ARRAY, 'tv').length).toBe(11);
    });
});

describe('filterShowsByReleasedBefore', () => {
    it('properly filters shows released on or before the specified date', () => {
        expect(filterShowsByReleasedBefore(SHOW_DATA_ARRAY, '2000-01-01').length).toBe(12);
        expect(filterShowsByReleasedBefore(SHOW_DATA_ARRAY, '2015-03-09').length).toBe(27);
        expect(filterShowsByReleasedBefore(SHOW_DATA_ARRAY, '1940-01-29').length).toBe(1);
    });
});

describe('filterShowsByReleasedAfter', () => {
    it('properly filters shows released on or after the specified date', () => {
        expect(filterShowsByReleasedAfter(SHOW_DATA_ARRAY, '2000-01-01').length).toBe(18);
        expect(filterShowsByReleasedAfter(SHOW_DATA_ARRAY, '2015-03-11').length).toBe(2);
        expect(filterShowsByReleasedAfter(SHOW_DATA_ARRAY, '1940-01-17').length).toBe(29);
    });
});

describe('filterShowsByReleasedBetween', () => {
    it('properly filters shows released on or after the specified date', () => {
        expect(
            filterShowsByReleasedBetween(SHOW_DATA_ARRAY, '2000-01-01', '2010-01-01').length
        ).toBe(5);
        expect(
            filterShowsByReleasedBetween(SHOW_DATA_ARRAY, '2015-03-11', '2023-01-01').length
        ).toBe(2);
        expect(
            filterShowsByReleasedBetween(SHOW_DATA_ARRAY, '1920-10-23', '1950-01-01').length
        ).toBe(1);
    });
});
