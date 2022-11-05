import React, { useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';

 /**
 * @returns tsx of the login form
 */ 
export default function LoginScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function signInWithEmail(e: React.SyntheticEvent) {
		e.preventDefault();
		const { data, error } = await SUPABASE.auth.signInWithPassword({
			email: email,
			password: password,
		});
		//TODO Error Handling with error param
	}

	return (
		<div>
			<div aria-live="polite">
				<h1>Supabase + React</h1>
				<p>Login</p>
				<form onSubmit={signInWithEmail}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="Your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						id=""
						type="password"
						placeholder="Your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button aria-live="polite">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}