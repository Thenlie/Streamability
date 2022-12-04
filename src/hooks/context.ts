import { useOutletContext } from 'react-router-dom';
import type { Profile, Session } from '../types';

// Supabase info about the currently logged in Profile
// Setter to update the profile info
type ProfileContextType = { 
    profile: Profile | null,
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
}
/**
 * @returns {ProfileContextType}
 */
export function useProfileContext(): ProfileContextType {
	return useOutletContext<ProfileContextType>();
}

// Supabase info about the currently logged in user's session
type SessionContextType = { 
    session: Session | null
    setSession: React.Dispatch<React.SetStateAction<Session | null>>
}

/**
 * @returns {SessionContextType}
 */
export function useSessionContext(): SessionContextType {
	return useOutletContext<SessionContextType>();
}
