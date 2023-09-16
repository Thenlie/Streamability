/**
 * Supabase user object from authentication table
 */
export interface User {
    app_metadata: unknown;
    aud: string;
    confirmation_sent_at?: string;
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
    last_sign_in_at: string;
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
    queue: string[];
    watched: string[];
    favorites: string[];
    adult: boolean;
    country: string;
    updated_at: string;
    created_at: string;
}

export type ProfileActions = {
    removeFromQueue: (showId: string) => Promise<void>;
    addToQueue: (showId: string) => Promise<void>;
    removeFromFavorites: (showId: string) => Promise<void>;
    addToFavorites: (showId: string) => Promise<void>;
    removeFromWatched: (showId: string) => Promise<void>;
    addToWatched: (showId: string) => Promise<void>;
};

export type ProfileArrayCols = 'queue' | 'favorites' | 'watched';
