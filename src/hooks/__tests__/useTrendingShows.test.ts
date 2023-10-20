import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import useTrendingShows from '../useTrendingShows';
import { getMovieTrending } from '../../helpers';
import { MOVIE_DATA_ARRAY } from './constants';

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
    it('When unable to fetch, returns null', () => {
        const { result } = renderHook(useTrendingShows);
        expect(result.current).toHaveProperty('loading');
        expect(result.current).toHaveProperty('trendingShows');
        expect(result.current.loading).toBe(false);
        expect(result.current.trendingShows).toBe(null);
    });
    describe('When able to fetch, returns an array of shows sorted by', () => {
        it('rating', async () => {
            vi.mocked(getMovieTrending).mockResolvedValue(MOVIE_DATA_ARRAY);
            const { result } = renderHook(({ sortBy }) => useTrendingShows(sortBy), {
                initialProps: { sortBy: SORT_BY[0] },
            });
            await act(
                async () => await waitFor(() => expect(result.current).toHaveProperty('loading'))
            );
            await waitFor(() => expect(result.current).toHaveProperty('trendingShows'));
            await waitFor(() => expect(result.current.loading).toBe(false));
            await waitFor(() => expect(result.current.trendingShows?.[0].id).toBe(1726));
            await waitFor(() => expect(result.current.trendingShows?.[0].title).toBe('Iron Man'));
            await waitFor(() => expect(result.current.trendingShows?.[0].media_type).toBe('movie'));
        });
        it('release', async () => {
            vi.mocked(getMovieTrending).mockResolvedValue(MOVIE_DATA_ARRAY);
            const { result } = renderHook(({ sortBy }) => useTrendingShows(sortBy), {
                initialProps: { sortBy: SORT_BY[1] },
            });
            await act(
                async () => await waitFor(() => expect(result.current).toHaveProperty('loading'))
            );
            await waitFor(() => expect(result.current).toHaveProperty('trendingShows'));
            await waitFor(() => expect(result.current.loading).toBe(false));
            await waitFor(() => expect(result.current.trendingShows?.[0].id).toBe(951647));
            await waitFor(() => expect(result.current.trendingShows?.[0].title).toBe('Iron Man'));
            await waitFor(() => expect(result.current.trendingShows?.[0].media_type).toBe('movie'));
        });
        it('alpha', async () => {
            vi.mocked(getMovieTrending).mockResolvedValue(MOVIE_DATA_ARRAY);
            const { result } = renderHook(({ sortBy }) => useTrendingShows(sortBy), {
                initialProps: { sortBy: SORT_BY[2] },
            });
            await act(
                async () => await waitFor(() => expect(result.current).toHaveProperty('loading'))
            );
            await waitFor(() => expect(result.current).toHaveProperty('trendingShows'));
            await waitFor(() => expect(result.current.loading).toBe(false));
            await waitFor(() => expect(result.current.trendingShows?.[0].id).toBe(37113));
            await waitFor(() =>
                expect(result.current.trendingShows?.[0].title).toBe(
                    'David Knight: Iron Man of Enduro'
                )
            );
        });
    });
});
