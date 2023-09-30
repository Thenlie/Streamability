import { ShowGenre } from './show';

/**
 * Returned by TMDB as non-detailed info
 * https://developer.themoviedb.org/reference/search-tv
 */
export interface TvData {
    id: number;
    media_type: 'movie' | 'tv';
    backdrop_path?: string | null;
    genre_ids?: number[];
    original_language?: string;
    original_name: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    first_air_date?: string;
    name: string;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
}

/**
 * Returned by TMDB find and recommendations request
 * https://developer.themoviedb.org/reference/find-by-id
 */
export interface TvResults {
    page?: number;
    results?: TvData[];
    total_pages?: number;
    total_results?: number;
}

/**
 * Returned by MovieDB details request
 * https://developer.themoviedb.org/reference/tv-series-details
 */
export interface TvDetailsData extends TvData {
    created_by: [
        {
            id: number;
            credit_id: string;
            name: string;
            gender: number;
            profile_path: string | null;
        },
    ];
    episode_run_time: number[];
    genres: ShowGenre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        season_number: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    };
    next_episode_to_air: null;
    networks: [
        {
            name: string;
            id: number;
            logo_path: string | null;
            origin_country: string;
        },
    ];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: [
        {
            id: number;
            logo_path: null | string;
            name: string;
            origin_country: string;
        },
    ];
    production_countires: [
        {
            iso_3166_1: string;
            name: string;
        },
    ];
    seasons: [
        {
            air_date: string;
            episode_count: number;
            id: number;
            name: string;
            overview: string;
            poster_path: string;
            season_number: number;
        },
    ];
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        },
    ];
    status: string;
    tagline: string;
    type: string;
    // content_ratings append to response
    content_ratings: {
        id: number;
        results: [
            {
                iso_3166_1: string;
                rating: string;
            },
        ];
    };
    release_dates: {
        results: [
            {
                iso_3166_1: string;
                rating: string;
            },
        ];
    };
}
