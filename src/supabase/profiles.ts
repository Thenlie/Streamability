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
			// TODO: Remove in production env
			console.error(error);
			return null;
		} else if (data) {
			return data as Profile;
		}
	} catch (error) {
		// TODO: Remove in production env
		console.error(error);
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
			// TODO: Remove in production env
			console.error(error);
			return null;
		} else if (data.length === 1) {
			return data[0] as Profile;
		}

	} catch (error) {
		// TODO: Remove in production env
		console.error(error);
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
		console.error(error);
	}
	return null;
};