import { SUPABASE } from '../helpers/supabaseClient';
import { Link } from 'react-router-dom';
import { User, Session } from '../types';

interface NavProps { user: User | null, session: Session | null }

/**
 * This component will be rendered in AppWapper.tsx - on every page.
 * Navigation elements are placeholder for the time being for development purposes.
 * @returns {JSX.Element} | Navigation
 */

export default function Navigation(props: NavProps): JSX.Element {

	console.log(props);
	const logoutHandler = async () => {
		// TODO: Error handling if any
		await SUPABASE.auth.signOut();
	};
	return (
	// TODO: Remove inline styling upon CSS framework integration
		<>
			<Link to="/" style={{ padding: '0 5px' }}>Home</Link>
			{props.session && props.user ? (
				<>
					<Link to="/dashboard" style={{ padding: '0 5px' }}>Dashboard</Link>
					<span onClick={logoutHandler} style={{ padding: '0 5px' }}>Logout</span>
				</>
			) : (
				<>
					<Link to="/auth/signup" style={{ padding: '0 5px' }}>Signup</Link>
					<Link to="/auth/login" style={{ padding: '0 5px' }}>Login</Link>
				</>
			)}
		</>
	);
}