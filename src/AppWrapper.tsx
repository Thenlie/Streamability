import { Outlet, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { SUPABASE } from './supabase/supabaseClient';
import type { Session, Profile } from './types';
import { Navigation, Footer } from './components';
import { getProfileById } from './supabase/profiles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { darkTheme, lightTheme } from './theme';
import type { Theme } from '@mui/material/styles';
import { SkeletonTheme } from 'react-loading-skeleton';
import Logger from './logger';

const LOG = new Logger('AppWrapper');

/**
 * The main app function, wrapping all other screens and components
 * This wraps the entire front end application and will be shown on every screen
 *
 * @returns {React.JSX.Element}
 */
export default function AppWrapper(): React.JSX.Element {
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [theme, setTheme] = useState<Theme>(darkTheme);
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

    // On app load, check for browser preferred color scheme
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setTheme(darkTheme);
        } else {
            document.documentElement.classList.remove('dark');
            setTheme(lightTheme);
        }

        mediaQuery.addEventListener('change', themeSwitcher);
        return () => {
            mediaQuery.removeEventListener('change', themeSwitcher);
        };
    }, []);

    // Handle theme switched by browser or user on site
    const themeSwitcher = () => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && document.documentElement.classList.contains('dark'))
        ) {
            localStorage.theme = 'light';
            setTheme(lightTheme);
        } else {
            localStorage.theme = 'dark';
            setTheme(darkTheme);
        }
        document.documentElement.classList.toggle('dark');
    };

    /**
     * Get session on page load, then listen
     * for any changes to the users status
     */
    useEffect(() => {
        if (!SUPABASE) {
            LOG.error('Supabase client was not created');
            return;
        }
        SUPABASE.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                LOG.error(error);
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
        <ThemeProvider theme={theme}>
            <SkeletonTheme
                baseColor={theme.palette.loader.base}
                highlightColor={theme.palette.loader.highlight}
            >
                <main className='flex min-h-screen flex-col place-items-center bg-background'>
                    <Navigation session={session} switchTheme={themeSwitcher} theme={theme} />
                    <div className='flex flex-auto flex-col items-center text-center w-full'>
                        <Outlet context={{ session, setSession, profile, setProfile }} />
                    </div>
                    <Footer />
                </main>
            </SkeletonTheme>
        </ThemeProvider>
    );
}
