import { describe, expect, it } from 'vitest';
import { filterShowsByGenre } from '../showFilterUtils';
import { SHOW_DATA_ARRAY } from './constants';

describe('showFilter', () => {
    it('properly filters shows based on a specified genre id', () => {
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 18).length).toBe(6);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 28).length).toBe(15);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 10752).length).toBe(1);
        expect(filterShowsByGenre(SHOW_DATA_ARRAY, 1).length).toBe(0);
    });
});
