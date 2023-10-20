import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import useTrendingShows from '../useTrendingShows';
import { getMovieTrending } from '../../helpers';
import { MOVIE_DATA_ARRAY } from '../../__tests__/screens/assets';

const SORT_BY: Array<'rating' | 'release' | 'alpha'> = ['rating', 'release', 'alpha'];

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getMovieTrending: vi.fn(),
        getTvTrending: vi.fn(),
    };
});

describe('useTrendingShows', () => {
    it('returns null when unable to fetch shows', () => {
        const { result } = renderHook(useTrendingShows);
        expect(result.current).toHaveProperty('loading');
        expect(result.current).toHaveProperty('trendingShows');
        expect(result.current.loading).toBe(false);
        expect(result.current.trendingShows).toBe(null);
    });
    it('returns a sorted array of shows when able to fetch', async () => {
        vi.mocked(getMovieTrending).mockResolvedValue(MOVIE_DATA_ARRAY);
        const { result } = renderHook(({ sortBy }) => useTrendingShows(sortBy), {
            initialProps: { sortBy: SORT_BY[0] },
        });
        act(() => {
            waitFor(() => expect(result.current).toHaveProperty('loading'));
            waitFor(() => expect(result.current).toHaveProperty('trendingShows'));
            waitFor(() => expect(result.current.loading).toBe(false));
            waitFor(() => expect(result.current.trendingShows?.[0].id).toBe(1726));
            waitFor(() => expect(result.current.trendingShows?.[0].title).toBe('Iron Man'));
            waitFor(() => expect(result.current.trendingShows?.[0].media_type).toBe('movie'));
        });
    });
});
