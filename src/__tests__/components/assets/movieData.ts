import { MovieDetailsData } from '../../../types/tmdb';

// Sample MovieDB response using 'Iron Man'. Some images have been removed for simplicity
export const sampleMovieDetailData: MovieDetailsData = {
    'adult': false,
    'backdrop_path': '/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg',
    'belongs_to_collection': {
        'id': 131292,
        'name': 'Iron Man Collection',
        'poster_path': '/2Oa2vNw7Ht5yXjIBHAzWNnkG6Y4.jpg',
        'backdrop_path': '/rI8zOWkRQJdlAyQ6WJOSlYK6JxZ.jpg'
    },
    'budget': 200000000,
    'genres': [
        {
            'id': 12,
            'name': 'Adventure'
        },
        {
            'id': 28,
            'name': 'Action'
        },
        {
            'id': 878,
            'name': 'Science Fiction'
        }
    ],
    'homepage': 'https://www.marvel.com/movies/iron-man-2',
    'id': 10138,
    'imdb_id': 'tt1228705',
    'original_language': 'en',
    'original_title': 'Iron Man 2',
    'overview': 'With the world now aware of his dual life as the armored superhero Iron Man, billionaire inventor Tony Stark faces pressure from the government, the press and the public to share his technology with the military. Unwilling to let go of his invention, Stark, with Pepper Potts and James \'Rhodey\' Rhodes at his side, must forge new alliances – and confront powerful enemies.',
    'popularity': 159.771,
    'poster_path': '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
    'production_companies': [
        {
            'id': 420,
            'logo_path': '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
            'name': 'Marvel Studios',
            'origin_country': 'US'
        }
    ],
    'production_countries': [
        {
            'iso_3166_1': 'US',
            'name': 'United States of America'
        }
    ],
    'release_date': '2010-04-28',
    'revenue': 623933331,
    'runtime': 124,
    'spoken_languages': [
        {
            'english_name': 'English',
            'iso_639_1': 'en',
            'name': 'English'
        },
        {
            'english_name': 'Russian',
            'iso_639_1': 'ru',
            'name': 'Pусский'
        },
        {
            'english_name': 'French',
            'iso_639_1': 'fr',
            'name': 'Français'
        }
    ],
    'status': 'Released',
    'tagline': 'It\'s not the armor that makes the hero, but the man inside.',
    'title': 'Iron Man 2',
    'video': false,
    'vote_average': 6.832,
    'vote_count': 18588,
    'images': {
        'backdrops': [
            {
                'aspect_ratio': 1.778,
                'height': 1080,
                'iso_639_1': null,
                'file_path': '/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg',
                'vote_average': 5.394,
                'vote_count': 10,
                'width': 1920
            },
            {
                'aspect_ratio': 1.778,
                'height': 2160,
                'iso_639_1': null,
                'file_path': '/93jZqX11iNmdon3zxGTlH6Q0YJb.jpg',
                'vote_average': 5.326,
                'vote_count': 7,
                'width': 3840
            },
            {
                'aspect_ratio': 1.78,
                'height': 810,
                'iso_639_1': null,
                'file_path': '/6zINLC59ButA0fjAQIyJmFFNdjM.jpg',
                'vote_average': 5.326,
                'vote_count': 7,
                'width': 1442
            },
        ],
        'logos': [
            {
                'aspect_ratio': 7.772,
                'height': 101,
                'iso_639_1': 'pt',
                'file_path': '/kM4a3uvzcm8KS6ihai2dCbqWtcO.png',
                'vote_average': 5.312,
                'vote_count': 1,
                'width': 785
            },
            {
                'aspect_ratio': 3.959,
                'height': 196,
                'iso_639_1': 'he',
                'file_path': '/syI1N6rjxVsuevqkPfGgKuPoO8U.png',
                'vote_average': 5.312,
                'vote_count': 1,
                'width': 776
            },
            {
                'aspect_ratio': 4.565,
                'height': 294,
                'iso_639_1': 'pt',
                'file_path': '/c3ns1kAEmQ2NOY98F9J35249pav.png',
                'vote_average': 5.172,
                'vote_count': 1,
                'width': 1342
            },
        ],
        'posters': [
            {
                'aspect_ratio': 0.667,
                'height': 1500,
                'iso_639_1': 'en',
                'file_path': '/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg',
                'vote_average': 5.172,
                'vote_count': 16,
                'width': 1000
            },
            {
                'aspect_ratio': 0.667,
                'height': 3000,
                'iso_639_1': 'en',
                'file_path': '/1NHEyFPxKnsLdMuDVPy6AI7GRmE.jpg',
                'vote_average': 5.52,
                'vote_count': 8,
                'width': 2000
            },
            {
                'aspect_ratio': 0.667,
                'height': 3000,
                'iso_639_1': 'pt',
                'file_path': '/vzROjQbgKWMVf2EldXipCcjpuBL.jpg',
                'vote_average': 5.456,
                'vote_count': 5,
                'width': 2000
            },
            {
                'aspect_ratio': 0.667,
                'height': 1281,
                'iso_639_1': 'uk',
                'file_path': '/4qdKTCnRHVS9AsxA9uvqcKWEWUq.jpg',
                'vote_average': 5.456,
                'vote_count': 5,
                'width': 854
            },
        ]
    },
    'release_dates': {
        'results': [
            {
                'iso_3166_1': 'PT',
                'release_dates': [
                    {
                        'certification': 'M/12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'CZ',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'DK',
                'release_dates': [
                    {
                        'certification': '11',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'SE',
                'release_dates': [
                    {
                        'certification': '11',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-28T00:00:00.000Z',
                        'type': 3
                    },
                    {
                        'certification': '11',
                        'iso_639_1': '',
                        'note': 'DVD & Blu-ray release',
                        'release_date': '2010-10-06T00:00:00.000Z',
                        'type': 5
                    }
                ]
            },
            {
                'iso_3166_1': 'HK',
                'release_dates': [
                    {
                        'certification': 'IIA',
                        'iso_639_1': null,
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'GR',
                'release_dates': [
                    {
                        'certification': '13',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'AU',
                'release_dates': [
                    {
                        'certification': 'M',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'ES',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'FR',
                'release_dates': [
                    {
                        'certification': 'U',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-28T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'MX',
                'release_dates': [
                    {
                        'certification': 'B',
                        'iso_639_1': null,
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'HU',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'BR',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'GB',
                'release_dates': [
                    {
                        'certification': '12A',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'IE',
                'release_dates': [
                    {
                        'certification': '12A',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'BG',
                'release_dates': [
                    {
                        'certification': 'PG-13',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'NL',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-28T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'US',
                'release_dates': [
                    {
                        'certification': 'PG-13',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-05-07T00:00:00.000Z',
                        'type': 3
                    },
                    {
                        'certification': 'PG-13',
                        'iso_639_1': '',
                        'note': 'DVD, Blu-ray',
                        'release_date': '2010-09-28T00:00:00.000Z',
                        'type': 5
                    }
                ]
            },
            {
                'iso_3166_1': 'IT',
                'release_dates': [
                    {
                        'certification': 'T',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'LT',
                'release_dates': [
                    {
                        'certification': 'N-13',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-30T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'TW',
                'release_dates': [
                    {
                        'certification': '保護級',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'SK',
                'release_dates': [
                    {
                        'certification': '',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'DE',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-05-05T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'CA',
                'release_dates': [
                    {
                        'certification': 'PG',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-05-07T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'KR',
                'release_dates': [
                    {
                        'certification': '12',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'IL',
                'release_dates': [
                    {
                        'certification': 'הותר לכל הגילאים',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'RU',
                'release_dates': [
                    {
                        'certification': '12+',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-04-29T00:00:00.000Z',
                        'type': 3
                    }
                ]
            },
            {
                'iso_3166_1': 'FI',
                'release_dates': [
                    {
                        'certification': 'K-11',
                        'iso_639_1': '',
                        'note': '',
                        'release_date': '2010-05-05T00:00:00.000Z',
                        'type': 3
                    }
                ]
            }
        ]
    }
};