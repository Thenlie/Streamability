/**
 * Supabase user object from authentication table
 */
export interface User {
    app_metadata: unknown;
    aud: string;
    confirmation_sent_at: string;
    confirmed_at?: string;
    created_at: string;
    email: string;
    email_confirmed_at?: string;
    id: string;
    identities: unknown;
    phone: string;
    role: string;
    updated_at: string;
    user_metadata: unknown;
    adult: boolean | null;
    country: string | null;
}

/**
 * Supabase user session object
 */
export interface Session {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: User;
}

/**
 * Supabase user profile object from public profiles table
 */
export interface Profile {
    id: string;
    username: string;
    email: string;
    avatar_url: string | null;
    watch_queue: string[];
    adult: boolean;
    country: string;
    updated_at: string;
    created_at: string;
}
