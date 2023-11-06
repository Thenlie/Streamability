import { beforeAll, describe, expect, it, vi } from 'vitest';
import { formatReleaseDate, DateSize, daysAgo, getReleaseDate } from '../dateFormatUtils';
import { SHOW_DATA_ARRAY } from './constants';

describe('formatReleaseDate', () => {
    const date1 = '2022-04-20';
    const date2 = '2000-01-01';
    const date3 = '1999-12-23';
    const date4 = '2023-09-31';
    const date5 = '2012-06-22';
    it('properly formats release date - LONG', () => {
        expect(formatReleaseDate(date1, DateSize.LONG)).toBe('April 20th, 2022');
        expect(formatReleaseDate(date2, DateSize.LONG)).toBe('January 1st, 2000');
        expect(formatReleaseDate(date3, DateSize.LONG)).toBe('December 23rd, 1999');
        expect(formatReleaseDate(date4, DateSize.LONG)).toBe('September 31st, 2023');
        expect(formatReleaseDate(date5, DateSize.LONG)).toBe('June 22nd, 2012');
    });
    it('properly formats release date - MEDIUM', () => {
        expect(formatReleaseDate(date1, DateSize.MEDIUM)).toBe('Apr 20th, 2022');
        expect(formatReleaseDate(date2, DateSize.MEDIUM)).toBe('Jan 1st, 2000');
        expect(formatReleaseDate(date3, DateSize.MEDIUM)).toBe('Dec 23rd, 1999');
        expect(formatReleaseDate(date4, DateSize.MEDIUM)).toBe('Sep 31st, 2023');
        expect(formatReleaseDate(date5, DateSize.MEDIUM)).toBe('Jun 22nd, 2012');
    });
    it('properly formats release date - SHORT', () => {
        expect(formatReleaseDate(date1, DateSize.SHORT)).toBe('4-20-2022');
        expect(formatReleaseDate(date2, DateSize.SHORT)).toBe('1-1-2000');
        expect(formatReleaseDate(date3, DateSize.SHORT)).toBe('12-23-1999');
        expect(formatReleaseDate(date4, DateSize.SHORT)).toBe('9-31-2023');
        expect(formatReleaseDate(date5, DateSize.SHORT)).toBe('6-22-2012');
    });
});

describe('daysAgo', () => {
    beforeAll(() => {
        // January 1st, 2000
        const mockDate = new Date(2000, 0, 1);
        vi.useFakeTimers();
        vi.setSystemTime(mockDate);
    });
    it('returns 180 days ago by default', () => {
        expect(daysAgo()).toBe('1999-07-05');
    });
    it('returns the correct date when given a param', () => {
        expect(daysAgo(181)).toBe('1999-07-04');
        expect(daysAgo(182)).toBe('1999-07-03');
        expect(daysAgo(183)).toBe('1999-07-02');
        expect(daysAgo(90)).toBe('1999-10-03');
        expect(daysAgo(1)).toBe('1999-12-31');
        expect(daysAgo(2)).toBe('1999-12-30');
        expect(daysAgo(3)).toBe('1999-12-29');
    });
});

describe('getReleaseDate', () => {
    it('return the properly formatted release date for a movie', () => {
        expect(getReleaseDate(SHOW_DATA_ARRAY[0])).toBe('April 30th, 2008');
        expect(getReleaseDate(SHOW_DATA_ARRAY[1])).toBe('April 24th, 2013');
        expect(getReleaseDate(SHOW_DATA_ARRAY[2])).toBe('April 28th, 2010');
        expect(getReleaseDate(SHOW_DATA_ARRAY[3])).toBe('April 18th, 2013');
    });
    it('return the properly formatted release date for a tv show', () => {
        expect(getReleaseDate(SHOW_DATA_ARRAY[20])).toBe('September 24th, 1994');
        expect(getReleaseDate(SHOW_DATA_ARRAY[21])).toBe('October 1st, 2010');
        expect(getReleaseDate(SHOW_DATA_ARRAY[22])).toBe('April 24th, 2009');
        expect(getReleaseDate(SHOW_DATA_ARRAY[23])).toBe('November 30th, 2010');
    });
});
