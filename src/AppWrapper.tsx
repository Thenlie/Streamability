import { Outlet, useOutletContext } from 'react-router-dom';
import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './helpers/supabaseClient';

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns Streamability!
 */

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
export default function AppWrapper() {


	const [session, setSession] = useState<Session | null>(null);
	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session as Session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
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
