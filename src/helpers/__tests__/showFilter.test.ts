import { describe, expect, it } from 'vitest';
import {
    filterShowsByAvgRatingAbove,
    filterShowsByAvgRatingBelow,
    filterShowsByAvgRatingBetween,
    filterShowsByGenre,
    filterShowsByRatingCountAbove,
    filterShowsByRatingCountBelow,
    filterShowsByRatingCountBetween,
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
    it('properly filters shows released on or between a specified date range', () => {
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

describe('filterShowsByAvgRatingBelow', () => {
    it('properly filters shows on or below a specified vote average', () => {
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 1).length).toBe(3);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 2).length).toBe(3);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 3).length).toBe(3);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 4).length).toBe(4);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 5).length).toBe(5);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 6).length).toBe(11);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 7).length).toBe(24);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 8).length).toBe(29);
        expect(filterShowsByAvgRatingBelow(SHOW_DATA_ARRAY, 9).length).toBe(30);
    });
});

describe('filterShowsByAvgRatingAbove', () => {
    it('properly filters shows on or above a specified vote average', () => {
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 1).length).toBe(28);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 2).length).toBe(28);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 3).length).toBe(28);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 4).length).toBe(27);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 5).length).toBe(26);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 6).length).toBe(20);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 7).length).toBe(7);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 8).length).toBe(2);
        expect(filterShowsByAvgRatingAbove(SHOW_DATA_ARRAY, 9).length).toBe(1);
    });
});

describe('filterShowsBtAvgRatingBetween', () => {
    it('properly filters shows on or between a specified vote average range', () => {
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 1, 10).length).toBe(28);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 2, 9).length).toBe(27);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 3, 8).length).toBe(26);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 4, 7).length).toBe(20);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 5, 6).length).toBe(6);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 6, 7).length).toBe(13);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 7, 10).length).toBe(7);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 1, 8).length).toBe(26);
        expect(filterShowsByAvgRatingBetween(SHOW_DATA_ARRAY, 1, 9).length).toBe(27);
    });
});

describe('filterShowsByRatingCountAbove', () => {
    it('properly filters shows on or above a specified number of votes', () => {
        expect(filterShowsByRatingCountAbove(SHOW_DATA_ARRAY, 1).length).toBe(28);
        expect(filterShowsByRatingCountAbove(SHOW_DATA_ARRAY, 100).length).toBe(14);
        expect(filterShowsByRatingCountAbove(SHOW_DATA_ARRAY, 1000).length).toBe(5);
        expect(filterShowsByRatingCountAbove(SHOW_DATA_ARRAY, 10000).length).toBe(3);
    });
});

describe('filterShowsByRatingCountBelow', () => {
    it('properly filters shows on or below a specified number of votes', () => {
        expect(filterShowsByRatingCountBelow(SHOW_DATA_ARRAY, 1).length).toBe(3);
        expect(filterShowsByRatingCountBelow(SHOW_DATA_ARRAY, 100).length).toBe(17);
        expect(filterShowsByRatingCountBelow(SHOW_DATA_ARRAY, 1000).length).toBe(26);
        expect(filterShowsByRatingCountBelow(SHOW_DATA_ARRAY, 10000).length).toBe(28);
    });
});

describe('filterShowsByRatingCountBetween', () => {
    it('properly filters shows on or between a specified number of votes range', () => {
        expect(filterShowsByRatingCountBetween(SHOW_DATA_ARRAY, 1, 100).length).toBe(14);
        expect(filterShowsByRatingCountBetween(SHOW_DATA_ARRAY, 100, 1000).length).toBe(9);
        expect(filterShowsByRatingCountBetween(SHOW_DATA_ARRAY, 1000, 10000).length).toBe(2);
        expect(filterShowsByRatingCountBetween(SHOW_DATA_ARRAY, 10000, 20000).length).toBe(1);
    });
});
