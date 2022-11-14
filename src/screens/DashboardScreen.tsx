import { useEffect, useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';
import { useSessionContext, useUserContext } from '../hooks';
import { getProfileById } from '../supabase/profiles';
import { Profile } from '../types/supabase';

/**
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
	const { session } = useSessionContext();
	const { user } = useUserContext();
	const [profile, setProfile] = useState<Profile | null>(null);

	useEffect(() => {
		const handler = async () => {
			if (user) {
				const profile = await getProfileById(user.id);
				setProfile(profile);
			}
		};
		handler();
	}, [user]);


	return (
		<div aria-live="polite">
			<form>
				<p>Email: {session?.user.email}</p>
				<p>id: {profile?.id}</p>
				<p>Username: {profile?.username}</p>
			</form>
			<button type="button" onClick={() => SUPABASE.auth.signOut()}>
				Sign Out
			</button>
		</div>
	);
}
