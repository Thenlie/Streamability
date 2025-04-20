import {
    Profile,
    ProfileActions,
    Session,
    ShowData,
    SeasonDetails,
    Episode,
    EpisodeDetails,
} from '../types';

export const TMDB_IMG_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

/* eslint-disable prettier/prettier */
export const TRENDING_DATA: ShowData[] = [
    {
        id: 507089,
        poster_path: '/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg',
        banner_path: '/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg',
        vote_average: 8.466,
        vote_count: 947,
        overview:
            'Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear\'s Pizzeria. But he soon discovers that nothing at Freddy\'s is what it seems.',
        media_type: 'movie',
        genre_ids: [27, 9648],
        title: 'Five Nights at Freddy\'s',
        release_date: '2023-10-25',
    },
    {
        id: 862968,
        poster_path: '/m0gM9jE1KmCkXZRqkeNYEQZdVsZ.jpg',
        banner_path: '/bMRofddQE58ToKM7GtdJy6MuKoY.jpg',
        vote_average: 6.484,
        vote_count: 91,
        overview:
            'After losing her job, a single mom falls into a lucrative but ultimately dangerous scheme selling prescription drugs.',
        media_type: 'movie',
        genre_ids: [18, 80],
        title: 'Pain Hustlers',
        release_date: '2023-10-20',
    },
    {
        id: 987917,
        poster_path: '/krA2iXd1PK1vhg4jeWfbSD4fSJi.jpg',
        banner_path: '/8G50Gbincsi1WYJXTyqsFuXNyK.jpg',
        vote_average: 6.304,
        vote_count: 102,
        overview:
            'A cranky middle-aged dad and his two best friends find themselves out of step in a changing world of millennial CEOs and powerful preschool principals.',
        media_type: 'movie',
        genre_ids: [35],
        title: 'Old Dads',
        release_date: '2023-10-20',
    },
];

export const MOVIE_DETAIL: ShowData = {
    id: 1726,
    poster_path: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    vote_average: 7.639,
    vote_count: 24976,
    overview:
        'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
    media_type: 'movie',
    genre_ids: [28, 878, 12],
    age_rating: 'PG-13',
    title: 'Iron Man',
    release_date: '2008-04-30',
    runtime: 126,
    providers: [
        {
            name: 'Disney Plus',
            id: 337,
            logo_path: '/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg',
            origin_country: 'US',
        },
    ],
    credits: {
        cast: [
            {
                adult: false,
                gender: 2,
                id: 3223,
                known_for_department: 'Acting',
                name: 'Robert Downey Jr.',
                original_name: 'Robert Downey Jr.',
                popularity: 57.084,
                profile_path: '/im9SAqJPZKEbVZGmjXuLI4O7RvM.jpg',
                cast_id: 19,
                character: 'Tony Stark / Iron Man',
                credit_id: '52fe4311c3a36847f8037ee9',
                order: 0
            }
        ],
        crew: []
    },
    seasons: undefined,
    end_date: null,
    next_air_date: null,
};

export const TV_DETAIL: ShowData = {
    id: 1399,
    poster_path: '/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
    vote_average: 8.441,
    vote_count: 22027,
    overview:
        'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night\'s Watch, is all that stands between the realms of men and icy horrors beyond.',
    media_type: 'tv',
    genre_ids: [10765, 18, 10759],
    age_rating: 'TV-MA',
    title: 'Game of Thrones',
    release_date: '2011-04-17',
    providers: [
        {
            name: 'Max Amazon Channel',
            id: 1825,
            logo_path: '/7TVfqxyWGqaJZM715IPHTwtgcXo.jpg',
            origin_country: 'US',
        },
        {
            name: 'Max',
            id: 1899,
            logo_path: '/6Q3ZYUNA9Hsgj6iWnVsw2gR5V6z.jpg',
            origin_country: 'US',
        },
        {
            name: 'Spectrum On Demand',
            id: 486,
            logo_path: '/1tLCqSH5xiViDxMiTVWl6DmE8hd.jpg',
            origin_country: 'US',
        },
    ],
    credits: {
        cast: [
            {
                adult: false,
                gender: 2,
                id: 22970,
                known_for_department: 'Acting',
                name: 'Peter Dinklage',
                original_name: 'Peter Dinklage',
                popularity: 29.051,
                profile_path: '/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg',
                cast_id: 0,
                character: 'Tyrion \'The Halfman\' Lannister',
                credit_id: '5256c8b219c2956ff6047cd8',
                order: 0
            }
        ],
        crew: []
    },
    seasons: [
        {
            air_date: '2010-12-05',
            episode_count: 269,
            id: 3627,
            name: 'Specials',
            overview: '',
            poster_path: '/kMTcwNRfFKCZ0O2OaBZS0nZ2AIe.jpg',
            season_number: 0,
            vote_average: 0,
        },
        {
            air_date: '2011-04-17',
            episode_count: 10,
            id: 3624,
            name: 'Season 1',
            overview:
                'Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros\' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.',
            poster_path: '/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg',
            season_number: 1,
            vote_average: 8.3,
        },
        {
            air_date: '2012-04-01',
            episode_count: 10,
            id: 3625,
            name: 'Season 2',
            overview:
                'The cold winds of winter are rising in Westeros...war is coming...and five kings continue their savage quest for control of the all-powerful Iron Throne. With winter fast approaching, the coveted Iron Throne is occupied by the cruel Joffrey, counseled by his conniving mother Cersei and uncle Tyrion. But the Lannister hold on the Throne is under assault on many fronts. Meanwhile, a new leader is rising among the wildings outside the Great Wall, adding new perils for Jon Snow and the order of the Night\'s Watch.',
            poster_path: '/9xfNkPwDOqyeUvfNhs1XlWA0esP.jpg',
            season_number: 2,
            vote_average: 8.2,
        },
    ],
    end_date: '2019-05-19',
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

export const PROFILE: Profile = {
    id: '35b95b23-5613-442d-a65f-4ea9650d1eda',
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

export const PROFILE_ACTIONS: ProfileActions = {
    removeFromFavorites: async () => { },
    removeFromQueue: async () => { },
    removeFromWatched: async () => { },
    addToFavorites: async () => { },
    addToQueue: async () => { },
    addToWatched: async () => { },
    queueLoading: false,
    favoritesLoading: false,
    watchedLoading: false,
};

export const ACTOR = {
    adult: false,
    gender: 2,
    id: 3223,
    known_for_department: 'Acting',
    name: 'Robert Downey Jr.',
    original_name: 'Robert Downey Jr.',
    popularity: 57.084,
    profile_path: '/im9SAqJPZKEbVZGmjXuLI4O7RvM.jpg',
    cast_id: 19,
    character: 'Tony Stark / Iron Man',
    credit_id: '52fe4311c3a36847f8037ee9',
    order: 0
};

export const SEASON: SeasonDetails = {
    air_date: '2011-04-17',
    episode_count: 1,
    id: 3624,
    name: 'Season 1',
    overview:
        'Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros\' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.',
    poster_path: '/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg',
    season_number: 1,
    vote_average: 8.3,
    _id: '5256c89f19c2956ff6046d47',
    episodes: [
        {
            air_date: '2011-04-17',
            episode_number: 1,
            id: 63056,
            name: 'Winter Is Coming',
            overview: 'Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon\'s place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.',
            production_code: '101',
            runtime: 62,
            season_number: 1,
            show_id: 1399,
            still_path: '/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg',
            vote_average: 8.033,
            vote_count: 361,
            crew: [],
            guest_stars: [],
        }
    ]
};

export const EPISODE: Episode = {
    air_date: '2011-04-17',
    episode_number: 1,
    id: 63056,
    name: 'Winter Is Coming',
    overview: 'Jon Arryn, the Hand of the King, is dead. King Robert Baratheon plans to ask his oldest friend, Eddard Stark, to take Jon\'s place. Across the sea, Viserys Targaryen plans to wed his sister to a nomadic warlord in exchange for an army.',
    production_code: '101',
    runtime: 62,
    season_number: 1,
    show_id: 1399,
    still_path: '/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg',
    vote_average: 8.033,
    vote_count: 361,
    crew: [
        {
            job: 'Writer',
            department: 'Writing',
            credit_id: '5256c8a019c2956ff6046e2b',
            adult: false,
            gender: 2,
            id: 9813,
            known_for_department: 'Writing',
            name: 'David Benioff',
            original_name: 'David Benioff',
            popularity: 0.066,
            profile_path: '/bOlW8pymCeQLfwPIvc2D1MRcUoF.jpg'
        },
        {
            department: 'Directing',
            job: 'Director',
            credit_id: '5256c8a219c2956ff6046e77',
            adult: false,
            gender: 2,
            id: 44797,
            known_for_department: 'Directing',
            name: 'Tim Van Patten',
            original_name: 'Tim Van Patten',
            popularity: 0.058,
            profile_path: '/vwcARZBg4PEzOwnPsXdjRWeUVrZ.jpg'
        },
        {
            job: 'Writer',
            department: 'Writing',
            credit_id: '5256c8a219c2956ff6046e4b',
            adult: false,
            gender: 2,
            id: 228068,
            known_for_department: 'Writing',
            name: 'D. B. Weiss',
            original_name: 'D. B. Weiss',
            popularity: 0.043,
            profile_path: '/2RMejaT793U9KRk2IEbFfteQntE.jpg'
        }
    ],
    guest_stars: [
        {
            character: 'Benjen Stark',
            credit_id: '5256c8b919c2956ff604836a',
            order: 61,
            adult: false,
            gender: 2,
            id: 119783,
            known_for_department: 'Acting',
            name: 'Joseph Mawle',
            original_name: 'Joseph Mawle',
            popularity: 0.101,
            profile_path: '/1Ocb9v3h54beGVoJMm4w50UQhLf.jpg'
        },
        {
            character: 'Rickon Stark',
            credit_id: '566a83bcc3a3683f56003604',
            order: 80,
            adult: false,
            gender: 2,
            id: 1050248,
            known_for_department: 'Acting',
            name: 'Art Parkinson',
            original_name: 'Art Parkinson',
            popularity: 0.041,
            profile_path: '/ejAKOJME1DsvHECLWdQ7dEtXyyc.jpg'
        },
        {
            character: 'Hodor',
            credit_id: '5256c8be19c2956ff6048446',
            order: 81,
            adult: false,
            gender: 2,
            id: 1223792,
            known_for_department: 'Acting',
            name: 'Kristian Nairn',
            original_name: 'Kristian Nairn',
            popularity: 0.028,
            profile_path: '/dlbq6cCW0xdpFY15q6flP6lDXWV.jpg'
        }
    ]
};

export const EPISODE_DETAILS: EpisodeDetails = {
    credits: {
        cast: [
            {
                adult: false,
                gender: 2,
                id: 22970,
                known_for_department: 'Acting',
                name: 'Peter Dinklage',
                original_name: 'Peter Dinklage',
                popularity: 0.327,
                profile_path: '/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg',
                character: 'Tyrion \'The Halfman\' Lannister',
                credit_id: '5256c8b219c2956ff6047cd8',
                order: 0
            },
            {
                adult: false,
                gender: 2,
                id: 239019,
                known_for_department: 'Acting',
                name: 'Kit Harington',
                original_name: 'Kit Harington',
                popularity: 0.188,
                profile_path: '/4MqUjb1SYrzHmFSyGiXnlZWLvBs.jpg',
                character: 'Jon Snow',
                credit_id: '5256c8af19c2956ff6047af6',
                order: 1
            },
            {
                adult: false,
                gender: 2,
                id: 48,
                known_for_department: 'Acting',
                name: 'Sean Bean',
                original_name: 'Sean Bean',
                popularity: 0.298,
                profile_path: '/kTjiABk3TJ3yI0Cto5RsvyT6V3o.jpg',
                character: 'Lord Eddard \'Ned\' Stark',
                credit_id: '58c7134792514179d20011a9',
                order: 2
            }
        ]
    },
    images: {
        stills: [
            {
                aspect_ratio: 1.778,
                height: 1080,
                iso_639_1: 'en',
                file_path: '/9hGF3WUkBf7cSjMg0cdMDHJkByd.jpg',
                vote_average: 6.312,
                vote_count: 8,
                width: 1920
            },
            {
                aspect_ratio: 1.778,
                height: 1080,
                iso_639_1: 'en',
                file_path: '/wrGWeW4WKxnaeA8sxJb2T9O6ryo.jpg',
                vote_average: 5.06,
                vote_count: 11,
                width: 1920
            },
            {
                aspect_ratio: 1.777,
                height: 995,
                iso_639_1: 'en',
                file_path: '/c05nayHjwQR2uPwkQwNy4UVVQlt.jpg',
                vote_average: 3.334,
                vote_count: 1,
                width: 1768
            }
        ]
    },
    videos: {
        results: []
    }
};