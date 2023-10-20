import { Profile, Session } from '../../types';

export const PROFILE1: Profile = {
    id: '1234',
    username: 'testUser',
    email: 'test@j.mail',
    avatar_url: null,
    queue: [],
    favorites: [],
    watched: [],
    adult: false,
    country: 'US',
    updated_at: '2023-09-10 02:43:55.346411+00',
    created_at: '2023-09-10 01:09:27.756489+00',
};

export const PROFILE2: Profile = {
    id: '1234',
    username: 'testUser',
    email: 'test@j.mail',
    avatar_url: null,
    queue: ['movie-123'],
    favorites: ['movie-123'],
    watched: ['movie-123'],
    adult: false,
    country: 'US',
    updated_at: '2023-09-10 02:43:55.346411+00',
    created_at: '2023-09-10 01:09:27.756489+00',
};

export const PROFILE3: Profile = {
    id: '1234',
    username: 'testUser',
    email: 'test@j.mail',
    avatar_url: null,
    queue: ['movie-13', 'tv-123'],
    favorites: ['movie-123'],
    watched: ['movie-123'],
    adult: false,
    country: 'US',
    updated_at: '2023-09-10 02:43:55.346411+00',
    created_at: '2023-09-10 01:09:27.756489+00',
};

export const PROFILE4: Profile = {
    id: '1234',
    username: 'testUser',
    email: 'test@j.mail',
    avatar_url: null,
    queue: ['movie-13', 'tv-123'],
    favorites: ['tv-123'],
    watched: ['movie-1234'],
    adult: false,
    country: 'US',
    updated_at: '2023-09-10 02:43:55.346411+00',
    created_at: '2023-09-10 01:09:27.756489+00',
};

export const SESSION: Session = {
    access_token: '1234',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: 1697774709,
    refresh_token: '1234',
    user: {
        id: 'e6692fba-4c1a-4d5a-a85b-713355e35c09',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'asdf@no.co',
        email_confirmed_at: '2023-09-16T05:50:48.231326Z',
        phone: '',
        confirmed_at: '2023-09-16T05:50:48.231326Z',
        last_sign_in_at: '2023-10-17T19:18:01.686608Z',
        app_metadata: {
            provider: 'email',
            providers: ['email'],
        },
        user_metadata: {
            username: 'asdf',
        },
        identities: [
            {
                id: 'e6692fba-4c1a-4d5a-a85b-713355e35c09',
                user_id: 'e6692fba-4c1a-4d5a-a85b-713355e35c09',
                identity_data: {
                    email: 'asdf@no.co',
                    sub: 'e6692fba-4c1a-4d5a-a85b-713355e35c09',
                },
                provider: 'email',
                last_sign_in_at: '2023-09-16T05:50:48.224093Z',
                created_at: '2023-09-16T05:50:48.224143Z',
                updated_at: '2023-09-16T05:50:48.224143Z',
            },
        ],
        created_at: '2023-09-16T05:50:48.196049Z',
        updated_at: '2023-10-20T03:05:09.440168Z',
        adult: false,
        country: 'US',
    },
};
