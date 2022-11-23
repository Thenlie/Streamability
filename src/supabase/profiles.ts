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
		const { data, error } = await SUPABASE
			.from('profiles')
			.select()
			.eq('id', id)
			.single();

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
export const updateProfileUsername = async (id: string, username: string): Promise<Profile | null> => {
	try {
		const { data, error } = await SUPABASE
			.from('profiles')
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
 * Delete a logged in users profile
 * 
 * @param id | uuid of user being deleted
 * @returns {Promise<Profile | null>}
 */
export const deleteProfileById = async (id: string): Promise<Profile | null> => {
	try {
		const { data, error } = await SUPABASE
			.from('profiles')
			.delete()
			.eq('id', id)
			.select();

		if (error) {
			// TODO: Remove in production env
			console.error(error);
		} else if (data.length === 1) {
			// TODO: #86 Delete user from Auth table in supabase
			await SUPABASE.auth.signOut();
			return data[0] as Profile;
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
export const addToProfileWatchQueue = async (id: string, show_id: number): Promise<Profile | null> => {
	try {
		const { data, error } = await SUPABASE
			.rpc('append_array', {
				id,
				show_id
			});
        
		if (error) {
			if (import.meta.env.DEV) console.error(error);
		} else if (data.length === 1) {
			return data[0];
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
export const removeFromProfileWatchQueue = async (id: string, show_id: number): Promise<Profile | null> => {
	try {
		const { data, error } = await SUPABASE
			.rpc('remove_array', {
				id,
				show_id
			});
        
		if (error) {
			if (import.meta.env.DEV) console.error(error);
		} else if(data.length === 1) {
			return data[0];
		}

	} catch (error) {
		if (import.meta.env.DEV) console.error(error);
	}
	return null;
};