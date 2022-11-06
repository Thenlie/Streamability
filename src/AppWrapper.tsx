import { Outlet } from 'react-router-dom';
import './App.css';

import { useState, useEffect } from 'react'
import { supabase } from './helpers/supabaseClient'
import Login from './screens/LoginScreen'
import Dashboard from './screens/Dashboard'

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns Streamability!
 */
export default function AppWrapper() {
	const [session, setSession] = useState(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])



	return (
		<div className="App">
			<h1>Streamability</h1>
			<div>
				<Outlet context={[session, setSession]} />
			</div>
		</div>
	);
}
