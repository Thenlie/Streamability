import { SUPABASE } from '../helpers';
import Logger from '../logger';
import { Profile } from '../types/supabase';

const LOG = new Logger('profiles');

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
            LOG.error(error);
            return null;
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
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
            LOG.error(error);
            return null;
        } else if (data.length === 1) {
            return data[0] as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
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
            LOG.error(error);
        } else if (data.length === 1) {
            // delete user account
            const { error } = await SUPABASE.rpc('delete_user');

            if (error) LOG.error(error);
            localStorage.clear();
            return;
        }
    } catch (error) {
        LOG.error(error as string);
    }
    return;
};

/**
 * Get a users queue. This method returns nothing
 * else so it can be a bit lighter than the full profile query
 *
 * @param id | uuid users profile being queried
 * @returns {Promise<number[] | null>}
 */
export const getProfileQueue = async (id: string): Promise<string[] | null> => {
    try {
        const { data, error } = await SUPABASE.from('profiles').select('queue').eq('id', id);

        if (error) {
            LOG.error(error);
        } else if (data) {
            return data[0].queue;
        }
    } catch (error) {
        LOG.error(error as string);
    }
    return null;
};

/**
 * Add a new show to a logged in users queue, watched, or favorites
 *
 * @param id | uuid of user being updated
 * @param show_id | movieDB id of show being added
 * @param which_col | profiles column to add to
 * @returns {Promise<Profile | null>}
 */
export const addToProfileArray = async (
    profile_id: string,
    show_id: string,
    which_col: 'queue' | 'watched' | 'favorites'
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.rpc('add_item', {
            profile_id,
            show_id,
            which_col,
        })
            .select()
            .single();

        if (error) {
            LOG.error(error);
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
    }
    return null;
};

/**
 * Remove a single show from a users queue, watched, or favorites
 *
 * @param id | uuid of user being updated
 * @param show_id | movieDB id of show being removed
 * @param which_col | profiles column to delete from
 * @returns {Promise<Profile | null>}
 */
export const removeFromProfileArray = async (
    profile_id: string,
    show_id: string,
    which_col: 'queue' | 'watched' | 'favorites'
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.rpc('remove_item', {
            profile_id,
            show_id,
            which_col,
        })
            .select()
            .single();

        if (error) {
            LOG.error(error);
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
    }
    return null;
};

/**
 * Removes all shows from a users queue, watched, or favorites
 *
 * @param id | uuid of user being updated
 * @param which_col | profiles column to delete
 * @returns {Promise<Profile | null>}
 */
export const removeProfileArray = async (
    profile_id: string,
    which_col: 'queue' | 'watched' | 'favorites'
): Promise<Profile | null> => {
    try {
        const { data, error } = await SUPABASE.rpc('remove_all', {
            profile_id,
            which_col,
        })
            .select()
            .single();

        if (error) {
            if (import.meta.env.DEV) LOG.error(error);
        } else if (data) {
            return data as Profile;
        }
    } catch (error) {
        if (import.meta.env.DEV) LOG.error(error as string);
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
            LOG.error(error);
        } else if (data) {
            return data[0] as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
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
            LOG.error(error);
        } else if (data) {
            return data[0] as Profile;
        }
    } catch (error) {
        LOG.error(error as string);
    }
    return null;
};
