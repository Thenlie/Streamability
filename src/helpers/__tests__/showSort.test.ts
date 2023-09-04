import { describe, expect, it } from 'vitest';
import {
    sortShowsAlphaAsc,
    sortShowsAlphaDesc,
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

describe('sortShowsByAlpha', () => {
    it('properly sorts shows alphabetically', () => {
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[0].title).toBe('Bartali: The Iron Man');
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[1].title).toBe('Blade Man');
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[2].title).toBe('Commandments');
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[30].title).toBe('The Marvel Super Heroes');
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[29].title).toBe('The Man with the Iron Heart');
        expect(sortShowsAlphaAsc(SHOW_DATA_ARRAY)[28].title).toBe('The Man with the Iron Fists 2');
    });
    it('properly sorts shows reverse alphabetically', () => {
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[0].title).toBe('The Marvel Super Heroes');
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[1].title).toBe('The Man with the Iron Heart');
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[2].title).toBe('The Man with the Iron Fists 2');
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[30].title).toBe('Bartali: The Iron Man');
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[29].title).toBe('Blade Man');
        expect(sortShowsAlphaDesc(SHOW_DATA_ARRAY)[28].title).toBe('Commandments');
    });
});
