export interface MovieData {
    page: number;
    results: MovieResultData[];
    total_pages: number;
    total_results: number;
}

export interface MovieResultData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetailsData extends MovieResultData {
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    },
    budget: number;
    genres: [{
        id: number;
        name: string;
    }]
    homepage: string;
    images: {
        backdrops: MovieImage[];
        logos: MovieImage[];
        posters: MovieImage[];
    },
    imdb_id: string;
    production_companies: [{
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
    }],
    production_countries: [{
        iso_3166_1: string;
        name: string;
    }],
    release_dates: {
        results: [{
            iso_3166_1: string;
            release_dates: [{
                certification: string;
                iso_639_1: string;
                note: string;
                release_date: string;
                type: number;
            }]
        }]
    }
    revenue: number;
    runtime: number;
    spoken_languages: [{
        english_name: string;
        iso_639_1: string;
        name: string;
    }],
    status: string;
    tagline: string;
}

export interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}
