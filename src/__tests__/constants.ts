import { ShowData } from '../types';

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
    seasons: null,
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
