import { Outlet, useOutletContext } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SUPABASE } from './helpers/supabaseClient';
import './App.css';

interface User {
	id: string,
	created_at: string,
	email: string,
	role: string,
	updated_at: string
}

interface Session {
	access_token: string,
	expires_at: number,
	expires_in: number,
	refresh_token: string,
	token_type: string,
	user: User;
}

type ContextType = { session: Session | null }
/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns Streamability!
 */
export default function AppWrapper() {
	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		SUPABASE.auth.getSession().then(({ data: { session } }) => {
			setSession(session as Session);
		});

		SUPABASE.auth.onAuthStateChange((_event, session) => {
			setSession(session as Session);
		});
	}, []);

	console.log(session);
	return (
		<div className="App">
			<h1>Streamability</h1>
			<div>
				<Outlet context={{ session }} />
			</div>
		</div>
	);
}

export function useSession() {
	return useOutletContext<ContextType>();
}
