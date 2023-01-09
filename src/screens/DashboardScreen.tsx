import { useEffect, useState } from 'react';
import { SUPABASE } from '../helpers/supabaseClient';
import { useSessionContext, useProfileContext } from '../hooks';
import {
    deleteProfileById,
    updateProfileUsername,
    getProfileWatchQueue,
} from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';

/**
 * User must be logged in to access endpoint
 *
 * @returns {JSX.Element} | A single users profile page
 */
export default function DashboardScreen(): JSX.Element {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    if (!session) {
        return <Navigate to={'/auth/login'} />;
    }

    useEffect(() => {
        const handler = async () => {
            if (session) {
                const queue = await getProfileWatchQueue(session.user.id);
                if (import.meta.env.DEV) console.log(queue);
            }
        };
        handler();
    }, [session]);

    const changeUsername = async () => {
        if (session) {
            const data = await updateProfileUsername(session.user.id, username);
            setProfile(data);
        }
    };

    /**
     * Delete profile row and auth entry.
     * We need to set the session to null here because
     * the util does not have access to the hook
     */
    const deleteProfile = async () => {
        if (session) {
            await deleteProfileById(session.user.id);
            setProfile(null);
            setSession(null);
            navigate('/');
        }
    };

    return (
        <div aria-live='polite'>
            <div>
                <p>Email: {session?.user.email}</p>
                <p>id: {profile?.id}</p>
                <p>Username: {profile?.username}</p>
            </div>
            <label htmlFor='username'>Username:</label>
            <input
                name='username'
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
            />
            <button onClick={() => changeUsername()}>Update Profile</button>
            <br />
            <button type='button' onClick={() => SUPABASE.auth.signOut()}>
                Sign Out
            </button>
            <br />
            <button onClick={() => deleteProfile()}>Delete Profile</button>
        </div>
    );
}
