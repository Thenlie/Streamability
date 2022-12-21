import { describe, expect, it } from 'vitest';
import { formatReleaseDate, DateSize } from '../../helpers/dateFormatUtils';

describe('Utility Testing Suite', () => {
    it('properly formats release date - LONG', () => {
        const date1 = '2022-04-20';
        const date2 = '2000-01-01';
        const date3 = '1999-12-23';
        const date4 = '2023-09-31';
        const date5 = '2012-06-22';
        expect(formatReleaseDate(date1, DateSize.LONG)).toBe('April 20th, 2022');
        expect(formatReleaseDate(date2, DateSize.LONG)).toBe('January 1st, 2000');
        expect(formatReleaseDate(date3, DateSize.LONG)).toBe('December 23rd, 1999');
        expect(formatReleaseDate(date4, DateSize.LONG)).toBe('September 31st, 2023');
        expect(formatReleaseDate(date5, DateSize.LONG)).toBe('June 22nd, 2012');
    });
    it('properly formats release date - MEDIUM', () => {
        const date1 = '2022-04-20';
        const date2 = '2000-01-01';
        const date3 = '1999-12-23';
        const date4 = '2023-09-31';
        const date5 = '2012-06-22';
        expect(formatReleaseDate(date1, DateSize.MEDIUM)).toBe('Apr 20th, 2022');
        expect(formatReleaseDate(date2, DateSize.MEDIUM)).toBe('Jan 1st, 2000');
        expect(formatReleaseDate(date3, DateSize.MEDIUM)).toBe('Dec 23rd, 1999');
        expect(formatReleaseDate(date4, DateSize.MEDIUM)).toBe('Sep 31st, 2023');
        expect(formatReleaseDate(date5, DateSize.MEDIUM)).toBe('Jun 22nd, 2012');
    });
    it('properly formats release date - SHORT', () => {
        const date1 = '2022-04-20';
        const date2 = '2000-01-01';
        const date3 = '1999-12-23';
        const date4 = '2023-09-31';
        const date5 = '2012-06-22';
        expect(formatReleaseDate(date1, DateSize.SHORT)).toBe('4-20-2022');
        expect(formatReleaseDate(date2, DateSize.SHORT)).toBe('1-1-2000');
        expect(formatReleaseDate(date3, DateSize.SHORT)).toBe('12-23-1999');
        expect(formatReleaseDate(date4, DateSize.SHORT)).toBe('9-31-2023');
        expect(formatReleaseDate(date5, DateSize.SHORT)).toBe('6-22-2012');
    });
});
