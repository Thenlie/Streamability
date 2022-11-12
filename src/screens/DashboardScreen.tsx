import { SUPABASE } from '../helpers/supabaseClient';
import { useSessionContext, useUserContext } from '../hooks';

/**
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
	const { session } = useSessionContext();
	const { user } = useUserContext();
	console.log(session, user);

	return (
		<div aria-live="polite">
			<form>
				<div>Email: {session?.user.email}</div>
			</form>
			<button type="button" onClick={() => SUPABASE.auth.signOut()}>
				Sign Out
			</button>
		</div>
	);
}
