import { useOutletContext } from 'react-router-dom';
import type { User, Session } from '../types';

// Supabase info about the currently logged in user
// Setter to update the user info
type UserContextType = { 
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
/**
 * @returns {UserContextType}
 */
export function useUserContext(): UserContextType {
	return useOutletContext<UserContextType>();
}

// Supabase info about the currently logged in user's session
type SessionContextType = { session: Session | null }

/**
 * @returns {SessionContextType}
 */
export function useSessionContext(): SessionContextType {
	return useOutletContext<SessionContextType>();
}
