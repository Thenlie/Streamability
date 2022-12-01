import { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import { SUPABASE } from '../../helpers/supabaseClient';
import { useSessionContext } from '../../hooks';
import { Navigate } from 'react-router-dom';

/**
 * Screen to handle Supabase sign up
 * 
 * @returns {JSX.Element}
 */
export default function SignUpForm(): JSX.Element {
	const { session } = useSessionContext();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	if (session) {
		return <Navigate to={'/dashboard'} />;
	}
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

		// Ensure all fields have input
		if (!email || !password || !confirmPassword || !username) {
			setErrorMessage('All fields must be filled out.');
			return;
		}

		// Ensure passwords match
		if (password !== confirmPassword) {
			setErrorMessage('Passwords must match.');
			return;
		}

		// Perform Supabase sign up POST request
		const { error } = await SUPABASE.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					username: username,
				}
			}
		});

		if (error) {
			setErrorMessage(error.message);
			if (import.meta.env.DEV) console.error(error);
		} else {
			setErrorMessage('');
			// onAuthStateChange function will be triggered
			// User has not logged in yet but we still get some information back
			// Check if 'confirmed_at' exists on user to see if they validated their email
		}

		return;
	};

	return (
		<div>
			<div aria-live="polite">
				<h2>Sign in via magic link with your email below</h2>
				<form onSubmit={signUpHandler}>
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/><br />
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/><br />
					<label htmlFor="password">Password: </label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/><br />
					<label htmlFor="confirm-password">Confirm Password: </label>
					<input
						name="confirm-password"
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/><br />
					<button>
						Submit
					</button>
					{errorMessage.length > 0 && (
						<ErrorMessage message={errorMessage} />
					)}
				</form>
			</div>
		</div>
	);
}