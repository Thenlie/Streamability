import { useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';

/**
 * @returns tsx of the signup form
 */
export default function SignupScreen() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [invalidSignUp, setInvalidSignUp] = useState(false);

	const signUpHandler = async (evt: React.SyntheticEvent) => {
		evt.preventDefault();
        
		// Ensure both fields have input
		if (!email || !password || !confirmPassword) {
			setInvalidSignUp(true);
			return;
		}

		// Ensure passwords match
		if (password !== confirmPassword) {
			setInvalidSignUp(true);
			return; 
		}

		// Perform Supabase sign up POST request
		const { data, error } = await SUPABASE.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			setInvalidSignUp(true);
			console.error(error);
		} else {
			setInvalidSignUp(false);
            console.log(data);
		}
	};

	return (
		<div>
			<div aria-live="polite">
				<h1>Supabase + React</h1>
				<p>Sign in via magic link with your email below</p>
				<form onSubmit={signUpHandler}>
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/><br/>
					<label htmlFor="password">Password: </label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/><br/>
					<label htmlFor="confirm-password">Confirm Password: </label>
					<input
						name="confirm-password"
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/><br/>
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