import React, { useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';
import { User } from '../types';
import { useUserContext } from '../hooks';

/**
 * @returns tsx of the login form
 */ 
export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [invalidSignUp, setInvalidSignUp] = useState(false);
	const { setUser } = useUserContext();

	async function signInWithEmail(evt: React.SyntheticEvent) {
		evt.preventDefault();

		// Ensure both fields have input
		if (!email || !password) {
			setInvalidSignUp(true);
			return;
		}

		// Perform Supabase login request
		const { data, error } = await SUPABASE.auth.signInWithPassword({
			email: email,
			password: password,
		});
        
		if (error) {
			setInvalidSignUp(true);
			console.error(error);
		} else {
			setInvalidSignUp(false);
			setUser(data.user as User);
		}
	}

	return (
		<div>
			<div aria-live="polite">
				<h1>Supabase + React</h1>
				<p>Login</p>
				<form onSubmit={signInWithEmail}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label htmlFor="password">Password: </label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button>
						Submit
					</button>
					{invalidSignUp && (
						<p>An error has occurred!</p>
					)}
				</form>
			</div>
		</div>
	);
}