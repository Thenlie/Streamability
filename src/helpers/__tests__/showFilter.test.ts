import { describe, expect, it } from 'vitest';
import { filterShowsByGenre, filterShowsByType } from '../showFilterUtils';
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
