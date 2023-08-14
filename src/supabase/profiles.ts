/* eslint-disable no-console */
import { SUPABASE } from '../helpers/supabaseClient';
import { Profile } from '../types/supabase';

/**
 * Get a single users profile information
 *
 * @param id | uuid of user being queried
 * @returns {Promise<Profile | null>} | User data
 */
export const getProfileById = async (id: string): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.from('profiles').select().eq('id', id).single();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
            return null;
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Change username of logged in users profile
 *
 * @param id | uuid of user being updated
 * @returns {Promise<Profile | null>}
 */
export const updateProfileUsername = async (
    id: string,
    username: string
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.from('profiles')
            .update({ username: username })
            .eq('id', id)
            .select();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
            return null;
        } else if (data.length === 1) {
            return data[0] as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Delete a logged in users profile and account
 *
 * @param id | uuid of user being deleted
 * @returns {Promise<void>}
 */
export const deleteProfileById = async (id: string): Promise<void> => {
    try {
        // delete profile
        const { data, error } = await SUPABASE.from('profiles').delete().eq('id', id).select();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data.length === 1) {
            // delete user account
            const { error } = await SUPABASE.rpc('delete_user');

            if (error) console.error(error);
            localStorage.clear();
            return;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return;
};

/**
 * Get a users watch queue. This method returns nothing
 * else so it can be a bit lighter than the full profile query
 *
 * @param id | uuid users profile being queried
 * @returns {Promise<number[] | null>}
 */
export const getProfileWatchQueue = async (id: string): Promise<string[] | null> => {
    try {
        const { data, error } = await SUPABASE.from('profiles').select('watch_queue').eq('id', id);

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data) {
            return data[0].watch_queue;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Add a new show to a logged in users watch queue
 *
 * @param id | uuid of user being updated
 * @param show_id | movieDB id of show being added
 * @returns {Promise<Profile | null>}
 */
export const addToProfileWatchQueue = async (
    id: string,
    show_id: string
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.rpc('append_array', {
            id,
            show_id,
        })
            .select()
            .single();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Remove a single show from a users watch queue
 *
 * @param id | uuid of user being updated
 * @param show_id | movieDB id of show being removed
 * @returns {Promise<Profile | null>}
 */
export const removeFromProfileWatchQueue = async (
    id: string,
    show_id: string
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.rpc('remove_array', {
            id,
            show_id,
        })
            .select()
            .single();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Update the adult flag of a users profile
 *
 * @param id | uuid of user being updated
 * @param isAdult | whether the adult flag will be set to true or false
 * @returns {Promise<Profile | null>}
 */
export const setProfileAdultFlag = async (
    id: string,
    isAdult: boolean
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.from('profiles')
            .update({ adult: isAdult })
            .eq('id', id)
            .select();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data) {
            return data[0] as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};

/**
 * Update the country code of a users profile
 *
 * @param id | uuid of user being updated
 * @param country | country code to be set on the profile
 * @returns {Promise<Profile | null>}
 */
export const setProfileCountry = async (id: string, country: string): Promise<Profile | null> => {
    try {
        // TODO: Ensure country code is valid
        const { data, error } = await SUPABASE.from('profiles')
            .update({ country: country })
            .eq('id', id)
            .select();

        if (error) {
            if (import.meta.env.DEV) console.error(error);
        } else if (data) {
            return data[0] as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) console.error(error);
    }
    return null;
};
