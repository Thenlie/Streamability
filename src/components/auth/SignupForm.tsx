import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import { SUPABASE } from '../../helpers/supabaseClient';
import { useUserContext } from '../../hooks';
import { User } from '../../types';

/**
 * Screen to handle Supabase sign up
 * 
 * @returns {JSX.Element}
 */
export default function SignUpForm(): JSX.Element {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const { setUser } = useUserContext();

	/**
     * Function to authenticate and perform Supabase sign up
     * This will not log the user in, it will send the user an email with a link
     * Once they click that link they will be logged in
     * 
     * @param evt | DOM submit event
     * @returns {Promise<void>} | Does not redirect user
     */
	const signUpHandler = async (evt: React.SyntheticEvent): Promise<void> => {
		evt.preventDefault();
        
		// Ensure both fields have input
		if (!email || !password || !confirmPassword) {
			setErrorMessage('All fields must be filled out.');
			return;
		}

		// Ensure passwords match
		if (password !== confirmPassword) {
			setErrorMessage('Passwords must match.');
			return; 
		}

		// Perform Supabase sign up POST request
		const { data, error } = await SUPABASE.auth.signUp({
			email: email,
			password: password,
		});

		if (error) {
			setErrorMessage(error.message);
			// TODO: Remove in production env
			console.error(error);
		} else {
			setErrorMessage('');
			// User has not logged in yet but we still get some information back
			// Check if 'confirmed_at' exists on user to see if they validated their email
			setUser(data.user as User);
		}

		return;
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
					{errorMessage.length > 0 && (
						<ErrorMessage message={errorMessage}/>
					)}
				</form>
			</div>
		</div>
	);
}