import { describe, expect, it } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { PROFILE1 } from './constants';
import useProfileActions from '../useProfileActions';

describe('useProfileActions', () => {
    it('Returns undefined when profile null', async () => {
        const { result } = renderHook(
            ({ profile, setProfile }) => useProfileActions(profile, setProfile),
            {
                initialProps: { profile: null, setProfile: () => {} },
            }
        );
        await waitFor(() => expect(result.current).toBe(undefined));
    });
    it('Returns show array when profile array contains data', async () => {
        const { result } = renderHook(
            ({ profile, setProfile }) => useProfileActions(profile, setProfile),
            {
                initialProps: { profile: PROFILE1, setProfile: () => {} },
            }
        );
        await waitFor(() => expect(result.current).toBeDefined());
        await waitFor(() => expect(result.current?.queueLoading).toBe(false));
        await waitFor(() => expect(result.current?.favoritesLoading).toBe(false));
        await waitFor(() => expect(result.current?.watchedLoading).toBe(false));
        await waitFor(() => expect(typeof result.current?.removeFromQueue).toBe('function'));
        await waitFor(() => expect(typeof result.current?.removeFromFavorites).toBe('function'));
        await waitFor(() => expect(typeof result.current?.removeFromWatched).toBe('function'));
        await waitFor(() => expect(typeof result.current?.addToQueue).toBe('function'));
        await waitFor(() => expect(typeof result.current?.addToFavorites).toBe('function'));
        await waitFor(() => expect(typeof result.current?.addToWatched).toBe('function'));
    });
});
