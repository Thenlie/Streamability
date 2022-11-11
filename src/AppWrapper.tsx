import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SUPABASE } from './helpers/supabaseClient';
import type { User, Session } from './types';
import './App.css';

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns {JSX.Element}
 */
export default function AppWrapper(): JSX.Element {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);

	/**
     * 
     * @TODO Add error handling. Move this logic to util file? 
     * @TODO Figure out how have onAuthStateChange listen always
     */
	useEffect(() => {
		SUPABASE.auth.getSession().then(({ data: { session } }) => {
			setSession(session as Session);
			setUser(session?.user as User);
		});

		SUPABASE.auth.onAuthStateChange((_event, session) => {
			setSession(session as Session);
			setUser(session?.user as User);
		});
	}, []);

	console.log(session, user);

	return (
		<div className="App">
			<h1>Streamability</h1>
			<div>
				<Outlet context={{session, user, setUser}} />
			</div>
		</div>
	);
}
