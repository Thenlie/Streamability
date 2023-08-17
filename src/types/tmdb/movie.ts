import { ShowGenre } from './show';

/**
 * Returned by TMDB as non-detailed info
 * https://developer.themoviedb.org/reference/search-movie
 */
export interface MovieData {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids?: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

/**
 * Returned by TMDB find and recommendations request
 * https://developer.themoviedb.org/reference/find-by-id
 */
export interface MovieResults {
    page?: number;
    results?: MovieData[];
    total_pages?: number;
    total_results?: number;
}

interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

/**
 * Returned by TMDB movie details request
 * https://developer.themoviedb.org/reference/movie-details
 */
export interface MovieDetailsData extends MovieData {
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number;
    genres: ShowGenre[];
    homepage: string;
    images: {
        backdrops: MovieImage[];
        logos: MovieImage[];
        posters: MovieImage[];
    };
    imdb_id: string;
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        },
    ];
    production_countries: [
        {
            iso_3166_1: string;
            name: string;
        },
    ];
    release_dates: {
        results: [
            {
                iso_3166_1: string;
                release_dates: [
                    {
                        certification: string;
                        iso_639_1: string;
                        note: string;
                        release_date: string;
                        type: number;
                    },
                ];
            },
        ];
    };
    revenue: number;
    runtime: number;
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        },
    ];
    status: string;
    tagline: string;
}