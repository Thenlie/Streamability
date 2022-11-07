import { SUPABASE } from '../helpers/supabaseClient';
import { useSession } from '../AppWrapper';

const DashboardScreen = () => {
	const { session } = useSession();
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