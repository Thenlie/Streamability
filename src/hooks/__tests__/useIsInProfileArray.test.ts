import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useIsInProfileArray from '../useIsInProfileArray';
import { PROFILE1, PROFILE2, PROFILE3, PROFILE4 } from './constants';

const result1 = {
    isInQueue: false,
    isInFavorites: false,
    isInWatched: false,
};

const result2 = {
    isInQueue: false,
    isInFavorites: false,
    isInWatched: false,
};

const result3 = {
    isInQueue: true,
    isInFavorites: true,
    isInWatched: true,
};

const result4 = {
    isInQueue: false,
    isInFavorites: false,
    isInWatched: true,
};

describe('useIsInProfileArray', () => {
    it('returns false for profile arrays that are empty', () => {
        const { result } = renderHook(
            ({ showId, profile }) => useIsInProfileArray(showId, profile),
            {
                initialProps: { showId: 1, profile: PROFILE1 },
            }
        );
        act(() => result.current);
        expect(result.current).toEqual(result1);
    });
    it('returns false for profile arrays that are do not contain matches', () => {
        const { result } = renderHook(
            ({ showId, profile }) => useIsInProfileArray(showId, profile),
            {
                initialProps: { showId: 1, profile: PROFILE2 },
            }
        );
        act(() => result.current);
        expect(result.current).toEqual(result2);
    });
    it('returns true for profile arrays when all contain matches', () => {
        const { result } = renderHook(
            ({ showId, profile }) => useIsInProfileArray(showId, profile),
            {
                initialProps: { showId: 123, profile: PROFILE3 },
            }
        );
        act(() => result.current);
        expect(result.current).toEqual(result3);
    });
    it('returns true for profile arrays when some contain matches', () => {
        const { result } = renderHook(
            ({ showId, profile }) => useIsInProfileArray(showId, profile),
            {
                initialProps: { showId: 1234, profile: PROFILE4 },
            }
        );
        act(() => result.current);
        expect(result.current).toEqual(result4);
    });
});
