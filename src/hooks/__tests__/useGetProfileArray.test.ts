import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useGetProfileArray from '../useGetProfileArray';
import { getMovieDetails } from '../../helpers';
import { useProfileContext, useSessionContext } from '../context';
import { PROFILE1, PROFILE2, SESSION, SHOW_DATA } from './constants';
import { ProfileArrayCols } from '../../types';
import { getProfileArray } from '../../supabase/profiles';

const WHICH_COL: ProfileArrayCols[] = ['queue', 'favorites', 'watched'];

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getMovieDetails: vi.fn(),
        getTvDetails: vi.fn(),
    };
});

vi.mock('../context', () => {
    return {
        useProfileContext: vi.fn(),
        useSessionContext: vi.fn(),
    };
});

vi.mock('../../supabase/profiles', async () => {
    const actual = await vi.importActual('../../supabase/profiles');

    return {
        ...(actual as object),
        getProfileArray: vi.fn(),
    };
});

describe('useGetProfileArray', () => {
    it('Returns null when profile array is empty', async () => {
        vi.mocked(getMovieDetails).mockResolvedValue(SHOW_DATA);
        vi.mocked(useSessionContext).mockReturnValue({
            session: SESSION,
            setSession: () => {},
        });
        vi.mocked(useProfileContext).mockReturnValue({
            profile: PROFILE1,
            setProfile: () => {},
        });
        const { result } = renderHook(({ whichCol }) => useGetProfileArray(whichCol), {
            initialProps: { whichCol: WHICH_COL[0] },
        });
        await waitFor(() => expect(result.current.data).toBe(null));
    });
    it('Returns show array when profile array contains data', async () => {
        vi.mocked(getMovieDetails).mockResolvedValue(SHOW_DATA);
        vi.mocked(useSessionContext).mockReturnValue({
            session: SESSION,
            setSession: () => {},
        });
        vi.mocked(useProfileContext).mockReturnValue({
            profile: PROFILE2,
            setProfile: () => {},
        });
        vi.mocked(getProfileArray).mockResolvedValue(['movie-123', 'tv-456']);
        const { result } = renderHook(({ whichCol }) => useGetProfileArray(whichCol), {
            initialProps: { whichCol: WHICH_COL[0] },
        });
        await waitFor(() => expect(result.current.data?.[0].id).toBe(1726));
        await waitFor(() => expect(result.current.data?.[0].title).toBe('Iron Man'));
        await waitFor(() => expect(result.current.data?.[0].vote_average).toBe(7.631));
    });
});
