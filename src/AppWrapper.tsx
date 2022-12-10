import { Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SUPABASE } from './helpers/supabaseClient';
import type { Session, Profile } from './types';
import './App.css';
import Navigation from './components/Navigation';
import { getProfileById } from './supabase/profiles';

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 * 
 * @returns {JSX.Element}
 */
export default function AppWrapper(): JSX.Element {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const navigate = useNavigate();

    /**
	 * When the session changed, this function will
	 * update the profile context accordingly
	 * 
	 * @param session | logged in user's details or null
	 */
    const profileSetter = async (session: Session) => {
        if (session) {
            const data = await getProfileById(session.user.id);
            setProfile(data);
        }
    };

    /**
	 * Get session on page load, then listen
     * for any changes to the users status
	 */
    useEffect(() => {
        SUPABASE.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                if (import.meta.env.DEV) console.error(error);
                return;
            }
            setSession(session as Session);
            profileSetter(session as Session);
        });

        const { data } = SUPABASE.auth.onAuthStateChange((_event, session) => {
            switch (_event) {
            case 'SIGNED_IN':
                setSession(session as Session);
                profileSetter(session as Session);
                break;
            case 'SIGNED_OUT':
                setSession(null);
                setProfile(null);
                navigate('/');
                break;
            case 'TOKEN_REFRESHED':
                setSession(session as Session);
                break;
            case 'USER_UPDATED':
                setSession(session as Session);
                profileSetter(session as Session);
                break;
                //  currently doesn't work
                //	case 'USER_DELETED':
            case 'PASSWORD_RECOVERY':
                setSession(session as Session);
                break;
            case 'MFA_CHALLENGE_VERIFIED':
                setSession(session as Session);
                break;
            }
        });

        return () => {
            data.subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="App">
            <Navigation session={session} />
            <Outlet context={{ session, setSession, profile, setProfile }} />
        </div>
    );
}
