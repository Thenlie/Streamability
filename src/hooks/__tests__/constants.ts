import { Profile } from '../../types';

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
