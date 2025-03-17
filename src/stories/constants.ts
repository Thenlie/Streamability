/* eslint-disable prettier/prettier */
import { Profile, Session, ShowData, Episode } from '../types';

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
    providers: [
        {
            name: 'Disney Plus',
            id: 1234,
            logo_path: null,
            origin_country: 'US',
        },
    ],
};

export const MOVIE_DATA_ARRAY: ShowData[] = [
    {
        id: 10138,
        poster_path: '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
        title: 'Iron Man 2',
        release_date: '2010-05-07',
        vote_average: 6.8,
        vote_count: 18842,
        overview:
            'With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press and the public to share his technology with the military. Unwilling to let go of his invention, Stark, with Pepper Potts and James \'Rhodey\' Rhodes at his side, must forge new alliances – and confront powerful enemies.',
        media_type: 'movie',
    },
    {
        id: 1726,
        poster_path: '/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
        title: 'Iron Man',
        release_date: '2008-04-30',
        vote_average: 7.6,
        vote_count: 23813,
        overview:
            'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
        media_type: 'movie',
    },
    {
        id: 68721,
        poster_path: '/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg',
        title: 'Iron Man 3',
        release_date: '2013-04-18',
        vote_average: 6.9,
        vote_count: 20256,
        overview:
            'When Tony Stark\'s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.',
        media_type: 'movie',
    },
    {
        id: 13647,
        poster_path: '/eebNTSRa5Hh5skPKGdGJIJpo9Ls.jpg',
        title: 'The Invincible Iron Man',
        release_date: '2007-01-23',
        vote_average: 6.1,
        vote_count: 191,
        overview:
            'When a cocky industrialist\'s efforts to raise an ancient Chinese temple leads him to be seriously wounded and captured by enemy forces, he must use his ideas for a revolutionary power armor in order to fight back as a superhero.',
        media_type: 'movie',
    },
    {
        id: 230896,
        poster_path: '/e7F2ZNA7wMneoSKGonLKjDmjFEd.jpg',
        title: 'Iron Man & Hulk: Heroes United',
        release_date: '2013-12-03',
        vote_average: 5.7,
        vote_count: 159,
        overview:
            'The Invincible Iron Man and the Incredible Hulk must join forces to save the Earth from its greatest threat yet! When two Hydra scientists try to supercharge a Stark Arc Reactor with Hulk\'s Gamma Energy, they unleash a being of pure electricity called Zzzax - and he\'s hungry for destruction. Together, Iron Man and Hulk are the only force that stands in the way of the Zzzax\'s planetary blackout. But first, the super heroic duo will have to get through snarling Wendigos, deadly robots and the scaly powerhouse, Abomination.  Can two of Marvel\'s mightiest heroes find a way to work together without smashing each other before time runs out?',
        media_type: 'movie',
    },
    {
        id: 284274,
        poster_path: '/CX7eRlaxFXiW3UGQBdQUoSVZRi.jpg',
        title: 'Iron Man & Captain America: Heroes United',
        release_date: '2014-07-29',
        vote_average: 6.3,
        vote_count: 116,
        overview:
            'Iron Man and Captain America battle to keep the Red Skull and his triggerman, Taskmaster, from unleashing an army of Hydra Brutes on the world!  Sequel to the film "Iron Man & Hulk: Heroes United" and feature Iron Man teaming up with Captain America, it comes to accompany the live-action film "Captain America: The Winter Soldier".',
        media_type: 'movie',
    },
    {
        id: 448341,
        poster_path: '/81zROb3C2MnOE67AwgAdWWfy4gK.jpg',
        title: 'I Am Iron Man',
        release_date: '2008-09-30',
        vote_average: 7.3,
        vote_count: 61,
        overview:
            'A documentary covering pre-production topics like suit design and construction, storyboards, animatics, and pre-viz, sets, working in the suit, casting, rehearsals, and preparation, and the start of the shoot. From there we look at performances, locations and production design, stunts, hardware and practical effects, and various sequence specifics. Finally, the program goes through post-production at Skywalker Ranch, the titles and a few visual elements, and wrapping up the flick.',
        media_type: 'movie',
    },
    {
        id: 512127,
        poster_path: '/7sk9MyHMuipgIo5m6v6biCNXPHv.jpg',
        title: 'The Invincible Iron Man',
        release_date: '2008-09-30',
        vote_average: 6.5,
        vote_count: 7,
        overview:
            'A documentary divided into six-part: For a look at the movie\'s comic book origins, we hear notes from Brevoort, Quesada, creator Stan Lee, writers Gerry Conway, Joe Casey, Dan Knauf, Charles Knauf and Warren Ellis, writer/artist Bob Layton, and artists Gene Colan, John Romita, Jr., Patrick Zircher and Adi Granov. The piece examines the origins of Iron Man as well as aspects of the character, supporting roles and villains. We also learn about the series\' development, various story lines it pursued over the years, and challenges.',
        media_type: 'movie',
    },
    {
        id: 194310,
        poster_path: '/l66ZkItJmi4er0I0mGe4mksjfB.jpg',
        title: 'Iron Man',
        release_date: '1931-04-29',
        vote_average: 4.8,
        vote_count: 9,
        overview:
            'Prizefighter Mason loses his opening fight so wife Rose leaves him for Hollywood. Without her around Mason trains and starts winning. Rose comes back and wants Mason to dump his manager Regan and replace him with her secret lover Lewis.',
        media_type: 'movie',
    },
    {
        id: 635802,
        poster_path: '/wAmSMgyxCwjSxhqExSYmstMQPH.jpg',
        title: 'Elon Musk: The Real Life Iron Man',
        release_date: '2018-12-04',
        vote_average: 5.5,
        vote_count: 13,
        overview:
            'Discover the meteoric rise of Elon Musk, the man who is transforming the way we think about travel technology through electric cars, the Hyperloop, and revolutionary ideas on how we live through artificial intelligence and colonizing Mars.',
        media_type: 'movie',
    },
    {
        id: 69592,
        poster_path: '/eJh3B7ekyN97e0PXUeumwVdFVP4.jpg',
        title: 'Iron Man',
        release_date: '1951-09-20',
        vote_average: 3.7,
        vote_count: 7,
        overview:
            'In Coaltown, Pennsylvania, miner Coke Mason hopes to better himself, buy a radio store, and marry Rose Warren. His gambler brother George thinks Coke can be more successful as a boxer, knowing that when he fights he\'s consumed with a murderous rage that makes him an "iron man." Seeing dollar signs in Rose\'s eyes, Coke reluctantly agrees, though he\'s fearful of the "killer instinct" that makes him a knockout success in the ring...and brings him the booing hatred of the fans. Will Coke throw off his personal demon before he kills someone?',
        media_type: 'movie',
    },
    {
        id: 928743,
        poster_path: '/cv1C3Bpvb2zUaO1deWosihfmgHV.jpg',
        title: 'The Iron Man',
        release_date: '1973-01-19',
        vote_average: 0,
        vote_count: 0,
        overview:
            'In 1944 Chang Chin\'s father was murdered by the Japanese with the help of Ching Tang and Fan Hsi-Shang, two collaborators led by Fung Mu. Now a grown up and a master of kung fu, Chang is ready to revenge his father.',
        media_type: 'movie',
    },
    {
        id: 951647,
        poster_path: '/A6aK12Ysdez1SRnGakxodg0SuQ5.jpg',
        title: 'Iron Man',
        release_date: '2020-01-01',
        vote_average: 0,
        vote_count: 0,
        overview: 'Video work by Ahaad Al Amoudi',
        media_type: 'movie',
    },
    {
        id: 165457,
        poster_path: null,
        title: 'The Iron Man',
        release_date: '1931-04-14',
        vote_average: 4.5,
        vote_count: 2,
        overview:
            'A feline organ grinder wanders by Farmer Al Falfa\'s house making some very bad music. Farmer Al Falfa chases him away. Later, the old man chases two roosters up a tree. One of the roosters, improbably, lays an egg and throws it at Al Falfa. The old man climbs up the tree with a handsaw. He sits on the same branch as the roosters, and begins sawing it off. The roosters jump from the branch into a hole in the tree. Al Falfa doesn\'t realize what he\'s doing until he saws the branch clean through. Cartoon magic is on his side: the tree falls, but the branch stays in place. Later, a delivery man drops off a large package. Al Falfa is surprised to see that it\'s a robot. The robot performs a dance, and Al Falfa feels compelled to mimic him. The robot kicks Farmer Al Falfa in the behind. Al Falfa does the same to the robot, which causes it to grow so tall it reaches outer space.',
        media_type: 'movie',
    },
    {
        id: 579122,
        poster_path: '/fNXKrWMad6ubB4wBhOHUcevgwVE.jpg',
        title: 'The Iron Man',
        release_date: '2007-07-27',
        vote_average: 5,
        vote_count: 1,
        overview: 'A tale based on the life of the inventor of the original "Iron Man".',
        media_type: 'movie',
    },
    {
        id: 702432,
        poster_path: null,
        title: 'E29 IRON MAN',
        release_date: '',
        vote_average: 0,
        vote_count: 0,
        overview: '',
        media_type: 'movie',
    },
    {
        id: 922706,
        poster_path: null,
        title: 'Joss Naylor - Iron Man',
        release_date: '',
        vote_average: 0,
        vote_count: 0,
        overview:
            'The film of the unique physical challenge. Legendary athlete Joss Naylor wanted to commemorate 50 years of competitive fell running.  On the longest day of the year he set off from Mungriside in the northern fells to run home to Greens Dale in the Wasdale valley.',
        media_type: 'movie',
    },
    {
        id: 331728,
        poster_path: null,
        title: 'Joe Coffey: ICW\'s Iron Man',
        release_date: '2015-03-19',
        vote_average: 0,
        vote_count: 0,
        overview:
            'An in-depth look at Joe Coffey\'s life, career and road to the main event of Barramania vs. Drew Galloway.',
        media_type: 'movie',
    },
    {
        id: 37113,
        poster_path: null,
        title: 'David Knight: Iron Man of Enduro',
        release_date: '2004-01-01',
        vote_average: 5.3,
        vote_count: 2,
        overview:
            'A fascinating and intimate portrait of one of the true stars of motorsport - David Knight. This film charts his rise to global domination, from his early years through the glory days and right up to his 2007 bid to tackle the Grand National Cross Country series. Knight has dominated the scene for several years - twice World Enduro Champion, twice Erzberg Extreme winner, twice US Red Bull Last Man Standing victor, AMA Enduro Cross Champion, ISDE Overall winner and six-times British Enduro Champion. In this film you can see Knight in action, including extreme and indoor performances, as well as hearing from the man himself.',
        media_type: 'movie',
    },
    {
        id: 448342,
        poster_path: null,
        title: 'Wired: The Visual Effects of Iron Man',
        release_date: '2008-09-30',
        vote_average: 6,
        vote_count: 2,
        overview:
            'A seven-part "making-of" documentary featuring Jon Favreau, visual effects supervisor John Nelson, Embassy VFS supervisor Winston Helgason, 3D artist Paul Copeland, lead 3D artist Michael Blackburn, Orphanage VFX supervisor Jonathan Rothbart, visualization/HUD effects supervisor Kent Seki, HUD design supervisor Dav Rauch, ILM VFX supervisor Ben Snow, animation director Hal Hickel, view painter Ron Woodall, model supervisor Bruce Holcomb, VFX art director Aaron McBride, composing supervisor Jeff Sutherland, and technical director Philippe Rebours. It visits the three effects studios that handled Iron Man - The Embassy, The Orphanage, and ILM - and examines what each one did for the film. It goes through the appropriate effects topics in a solid manner that gives us a good idea of the challenges and their solutions.',
        media_type: 'movie',
    },
];

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

export const SEASON = {
    show_id: 1399,
    air_date: '2011-04-17',
    episode_count: 10,
    id: 3624,
    name: 'Season 1',
    overview:
        'Trouble is brewing in the Seven Kingdoms of Westeros. For the driven inhabitants of this visionary world, control of Westeros\' Iron Throne holds the lure of great power. But in a land where the seasons can last a lifetime, winter is coming...and beyond the Great Wall that protects them, an ancient evil has returned. In Season One, the story centers on three primary areas: the Stark and the Lannister families, whose designs on controlling the throne threaten a tenuous peace; the dragon princess Daenerys, heir to the former dynasty, who waits just over the Narrow Sea with her malevolent brother Viserys; and the Great Wall--a massive barrier of ice where a forgotten danger is stirring.',
    poster_path: '/wgfKiqzuMrFIkU1M68DDDY8kGC1.jpg',
    season_number: 1,
    vote_average: 8.3,
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
            popularity: 0.184,
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
            popularity: 0.161,
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
            popularity: 0.119,
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
            popularity: 0.281,
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
            popularity: 0.113,
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
            popularity: 0.077,
            profile_path: '/dlbq6cCW0xdpFY15q6flP6lDXWV.jpg'
        }
    ]
};
