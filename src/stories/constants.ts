import { Profile, Session, ShowData } from '../types';

export const PROFILE: Profile = {
    id: '1234',
    username: 'TestUser',
    email: 'example@no.mail',
    avatar_url: null,
    queue: ['movie-1726'],
    watched: ['movie-1726'],
    favorites: ['movie-1726'],
    adult: true,
    country: 'US',
    updated_at: '2023-08-09T03:17:57.310334+00:00',
    created_at: '2023-02-15T03:59:59.075061+00:00',
};

export const SESSION: Session = {
    access_token: 'token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: 1693865876,
    refresh_token: 'token',
    user: {
        id: 'token',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'test@no.co',
        email_confirmed_at: '2023-09-04T21:17:55.537437973Z',
        phone: '',
        last_sign_in_at: '2023-09-04T21:17:55.539816463Z',
        app_metadata: {
            provider: 'email',
            providers: ['email'],
        },
        user_metadata: {
            username: 'test',
        },
        identities: [
            {
                id: 'token',
                user_id: 'token',
                identity_data: {
                    email: 'test@no.co',
                    sub: 'token',
                },
                provider: 'email',
                last_sign_in_at: '2023-09-04T21:17:55.534787863Z',
                created_at: '2023-09-04T21:17:55.534822Z',
                updated_at: '2023-09-04T21:17:55.534822Z',
            },
        ],
        created_at: '2023-09-04T21:17:55.532453Z',
        updated_at: '2023-09-04T21:17:55.541357Z',
        country: 'US',
        adult: false,
    },
};

export const MOVIE_DATA: ShowData = {
    id: 1726,
    poster_path: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    title: 'Iron Man',
    release_date: '2008-04-30',
    age_rating: 'PG-13',
    runtime: 126,
    vote_average: 7.631,
    vote_count: 23740,
    overview:
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    media_type: 'movie',
    networks: [
        {
            name: 'Disney Plus',
            id: 1234,
            logo_path: null,
            origin_country: 'US',
        },
    ],
};
