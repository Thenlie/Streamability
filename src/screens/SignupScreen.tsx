import { useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';

export default function SignupScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { data, error } = await SUPABASE.auth.signUp({
			email: email,
			password: password,
		});
		console.log(email, password);
		//TODO Error Handling with error param
	};

	return (
		<div>
			<div aria-live="polite">
				<h1>Supabase + React</h1>
				<p>Sign in via magic link with your email below</p>
				<form onSubmit={signUp}>
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