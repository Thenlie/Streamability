import { SUPABASE } from '../helpers/supabaseClient';
import { Profile } from '../types/supabase';

/**
 * Get a single users profile information
 * 
 * @param id | uuid of user being queried
 * @returns {Promise<Profile | null>} | User data
 */
export const getProfileById = async (id: string): Promise<Profile | null> => {
	if (id) {
        try {
            const { data, error } = await SUPABASE
                .from('profiles')
                .select()
                .eq('id', id);
    
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
	} 
	return null;
};