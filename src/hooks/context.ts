import { useOutletContext } from 'react-router-dom';
import type { User, Session } from '../types';

// Supabase info about the currently logged in user
type UserContextType = { 
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export function useUserContext() {
	return useOutletContext<UserContextType>();
}

// Supabase info about the currently logged in user's session
type SessionContextType = { session: Session | null }

export function useSessionContext() {
	return useOutletContext<SessionContextType>();
}
