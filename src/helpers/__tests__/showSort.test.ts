import { describe, expect, it } from 'vitest';
import { sortShowsByRatingCountAsc, sortShowsByRatingCountDesc } from '../showSortUtils';
import { SHOW_DATA_ARRAY } from './constants';

describe('sortShowsByRatingCount', () => {
    it('properly sorts shows by vote count ascending', () => {
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[0].vote_count).toBe(0);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[30].vote_count).toBe(24715);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[29].vote_count).toBe(20941);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[28].vote_count).toBe(19625);
    });
    it('properly sorts shows by vote count descending', () => {
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[0].vote_count).toBe(24715);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[1].vote_count).toBe(20941);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[2].vote_count).toBe(19625);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[30].vote_count).toBe(0);
    });
});
