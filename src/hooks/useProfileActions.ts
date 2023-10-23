import { addToProfileArray, removeFromProfileArray } from '../supabase/profiles';
import { Profile, ProfileActions } from '../types';
import { useEffect, useState } from 'react';

/**
 * A custom hook that returns an object containing all
 * the possible profile actions. These include adding to
 * and removing from all profile arrays and loading states
 * for each of those actions.
 * Returns `undefined` when not logged in.
 */
const useProfileActions = (
    profile: Profile | null,
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
): ProfileActions | undefined => {
    const [profileActions, setProfileActions] = useState<ProfileActions | undefined>(undefined);
    const [queueLoading, setQueueLoading] = useState(false);
    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [watchedLoading, setWatchedLoading] = useState(false);

    const removeFromQueue = async (showId: string) => {
        if (!profile) return;
        setQueueLoading(true);
        const res = await removeFromProfileArray(profile.id, showId, 'queue');
        if (!res) return;
        setProfile(res);
        setQueueLoading(false);
    };

    const addToQueue = async (showId: string) => {
        if (!profile) return;
        setQueueLoading(true);
        const res = await addToProfileArray(profile.id, showId, 'queue');
        if (!res) return;
        setProfile(res);
        setQueueLoading(false);
    };

    const removeFromFavorites = async (showId: string) => {
        if (!profile) return;
        setFavoritesLoading(true);
        const res = await removeFromProfileArray(profile.id, showId, 'favorites');
        if (!res) return;
        setProfile(res);
        setFavoritesLoading(false);
    };

    const addToFavorites = async (showId: string) => {
        if (!profile) return;
        setFavoritesLoading(true);
        const res = await addToProfileArray(profile.id, showId, 'favorites');
        if (!res) return;
        setProfile(res);
        setFavoritesLoading(false);
    };

    const removeFromWatched = async (showId: string) => {
        if (!profile) return;
        setWatchedLoading(true);
        const res = await removeFromProfileArray(profile.id, showId, 'watched');
        if (!res) return;
        setProfile(res);
        setWatchedLoading(false);
    };

    const addToWatched = async (showId: string) => {
        if (!profile) return;
        setWatchedLoading(true);
        const res = await addToProfileArray(profile.id, showId, 'watched');
        if (!res) return;
        setProfile(res);
        setWatchedLoading(false);
    };

    useEffect(() => {
        if (!profile) return;
        setProfileActions({
            removeFromQueue,
            removeFromFavorites,
            removeFromWatched,
            addToQueue,
            addToFavorites,
            addToWatched,
            queueLoading,
            favoritesLoading,
            watchedLoading,
        });
    }, [profile, queueLoading, favoritesLoading, watchedLoading]);

    return profileActions;
};

export default useProfileActions;
