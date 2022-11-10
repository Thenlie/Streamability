import { SUPABASE } from '../helpers/supabaseClient';
import { useSessionContext } from '../hooks';

/**
 * @returns tsx of a specific users dashboard
 */
const DashboardScreen = () => {
	const { session } = useSessionContext();
	console.log(session);

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
};

export default DashboardScreen;