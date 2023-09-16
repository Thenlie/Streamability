import { useProfileContext } from './context';
import { addToProfileArray, removeFromProfileArray } from '../supabase/profiles';
import { ProfileActions } from '../types';

/**
 * Custom hook that returns an object containing all
 * the possible profile actions such as adding to and
 * removing from all profile arrays
 */
const useProfileActions = (): ProfileActions | undefined => {
    const { profile, setProfile } = useProfileContext();

    if (!profile) return undefined;

    const removeFromQueue = async (showId: string) => {
        const res = await removeFromProfileArray(profile.id, showId, 'queue');
        if (!res) return;
        setProfile(res);
    };

    const addToQueue = async (showId: string) => {
        const res = await addToProfileArray(profile.id, showId, 'queue');
        if (!res) return;
        setProfile(res);
    };

    const removeFromFavorites = async (showId: string) => {
        const res = await removeFromProfileArray(profile.id, showId, 'favorites');
        if (!res) return;
        setProfile(res);
    };

    const addToFavorites = async (showId: string) => {
        const res = await removeFromProfileArray(profile.id, showId, 'favorites');
        if (!res) return;
        setProfile(res);
    };

    const removeFromWatched = async (showId: string) => {
        const res = await removeFromProfileArray(profile.id, showId, 'watched');
        if (!res) return;
        setProfile(res);
    };

    const addToWatched = async (showId: string) => {
        const res = await removeFromProfileArray(profile.id, showId, 'watched');
        if (!res) return;
        setProfile(res);
    };

    const profileActions = {
        removeFromQueue,
        removeFromFavorites,
        removeFromWatched,
        addToQueue,
        addToFavorites,
        addToWatched,
    };

    return profileActions;
};

export default useProfileActions;
