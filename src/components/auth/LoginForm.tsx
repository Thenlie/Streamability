import React, { useState } from 'react';
import { SUPABASE } from '../../helpers/supabaseClient';

/**
 * @returns {JSX.Element}
 */ 
export default function LoginForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	/**
     * Function to authenticate and perform Supabase login
     * Once the user has logged in, 
     * their user info and session is stored in the context
     * 
     * @param evt | DOM submit event
     * @returns {Promise<void>} | Does not redirect user
     */
	async function signInWithEmail(evt: React.SyntheticEvent): Promise<void> {
		evt.preventDefault();

		// Ensure both fields have input
		if (!email || !password) {
			setErrorMessage('All fields must be filled out');
			return;
		}

		// Perform Supabase login request
		const { error } = await SUPABASE.auth.signInWithPassword({
			email: email,
			password: password,
		});
        
		if (error) {
			// We could try to get the AuthApiError type and use 'cause' instead
			setErrorMessage(error.message);
			if (import.meta.env.DEV) console.error(error);
		} else {
			setErrorMessage('');
			// onAuthStateChange function will be triggered
		}

		return;
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
					{errorMessage.length > 0 && (
						<p>An error has occurred!</p>
					)}
				</form>
			</div>
		</div>
	);
}