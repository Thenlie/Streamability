import { describe, expect, it } from 'vitest';
import {
    sortShowsByAvgRatingAsc,
    sortShowsByAvgRatingDesc,
    sortShowsByRatingCountAsc,
    sortShowsByRatingCountDesc,
    sortShowsByReleaseDateAsc,
    sortShowsByReleaseDateDesc,
} from '../showSortUtils';
import { SHOW_DATA_ARRAY } from './constants';

describe('sortShowsByRatingCount', () => {
    it('properly sorts shows by vote count ascending', () => {
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[0].vote_count).toBe(0);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[1].vote_count).toBe(0);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[2].vote_count).toBe(0);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[30].vote_count).toBe(24715);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[29].vote_count).toBe(20941);
        expect(sortShowsByRatingCountAsc(SHOW_DATA_ARRAY)[28].vote_count).toBe(19625);
    });
    it('properly sorts shows by vote count descending', () => {
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[0].vote_count).toBe(24715);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[1].vote_count).toBe(20941);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[2].vote_count).toBe(19625);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[30].vote_count).toBe(0);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[29].vote_count).toBe(0);
        expect(sortShowsByRatingCountDesc(SHOW_DATA_ARRAY)[28].vote_count).toBe(0);
    });
});

describe('sortShowsByAvgRating', () => {
    it('properly sorts shows by average rating ascending', () => {
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[0].vote_average).toBe(0);
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[1].vote_average).toBe(0);
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[2].vote_average).toBe(0);
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[30].vote_average).toBe(10);
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[29].vote_average).toBe(8.4);
        expect(sortShowsByAvgRatingAsc(SHOW_DATA_ARRAY)[28].vote_average).toBe(7.669);
    });
    it('properly sorts shows by average rating descending', () => {
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[0].vote_average).toBe(10);
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[1].vote_average).toBe(8.4);
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[2].vote_average).toBe(7.669);
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[30].vote_average).toBe(0);
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[29].vote_average).toBe(0);
        expect(sortShowsByAvgRatingDesc(SHOW_DATA_ARRAY)[28].vote_average).toBe(0);
    });
});

describe('sortShowsByReleaseDate', () => {
    it('properly sorts shows by release date ascending', () => {
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[0].release_date).toBe('1931-04-29');
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[1].release_date).toBe('1951-09-20');
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[2].release_date).toBe('1963-10-20');
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[30].release_date).toBe('2017-10-17');
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[29].release_date).toBe('2017-05-25');
        expect(sortShowsByReleaseDateAsc(SHOW_DATA_ARRAY)[28].release_date).toBe('2015-03-10');
    });
    it('properly sorts shows by release date descending', () => {
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[0].release_date).toBe('2017-10-17');
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[1].release_date).toBe('2017-05-25');
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[2].release_date).toBe('2015-03-10');
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[30].release_date).toBe('1931-04-29');
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[29].release_date).toBe('1951-09-20');
        expect(sortShowsByReleaseDateDesc(SHOW_DATA_ARRAY)[28].release_date).toBe('1963-10-20');
    });
});
