import { useEffect, useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';
import { useSessionContext, useUserContext } from '../hooks';
import { getProfileById, updateProfileUsername } from '../supabase/profiles';
import { Profile } from '../types/supabase';

/**
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
	const { session } = useSessionContext();
	const { user } = useUserContext();
	const [profile, setProfile] = useState<Profile | null>(null);
    const [username, setUsername] = useState('');

	useEffect(() => {
		const handler = async () => {
			if (user) {
				const data = await getProfileById(user.id);
				setProfile(data);
			}
		};
		handler();
	}, [user]);

    const changeUsername = async () => {
        if (user) {
            const data = await updateProfileUsername(user.id, username);
            setProfile(data);
        }
    }

	return (
		<div aria-live="polite">
            <div>
                <p>Email: {session?.user.email}</p>
                <p>id: {profile?.id}</p>
                <p>Username: {profile?.username}</p>
            </div>
            <label htmlFor="username">Username:</label>
            <input name="username" onChange={(e) => {setUsername(e.target.value)}}/>
			<button onClick={() => changeUsername()}>
                Update Profile
			</button><br/>
			<button type="button" onClick={() => SUPABASE.auth.signOut()}>
				Sign Out
			</button>
		</div>
	);
}
