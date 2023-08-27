import { ShowData } from '../types';

export const PROFILE = {
    id: '1234',
    username: 'TestUser',
    email: 'example@no.mail',
    avatar_url: null,
    queue: ['1726'],
    adult: true,
    country: 'US',
    updated_at: '2023-08-09T03:17:57.310334+00:00',
    created_at: '2023-02-15T03:59:59.075061+00:00',
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
