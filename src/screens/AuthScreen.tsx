import { Outlet } from 'react-router-dom';
import { useSessionContext } from '../hooks';

/**
 * Wrapper for all authentication components
 * LoginForm, SignupForm
 * 
 * @returns {JSX.Element}
 */
export default function AuthScreen(): JSX.Element {
	const { session } = useSessionContext();

	return (
		<>
			<Outlet context={{ session }} />
		</>
	);
}