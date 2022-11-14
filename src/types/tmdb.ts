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
    poster_pat: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetailsData {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: any[],
    budget: number,
    genres: any[]
    homepage: string,
    id: number,
    images: any[],
    imdb_id: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: any[],
    production_countries: any[],
    release_date: string,
    release_dates: ReleaseDates,
    revenue: number,
    runtime: 179,
    spoken_languages: any[],
    status: string,
    tagline: string,
    title: string,
    video: number,
    vote_average: number,
    vote_count: number
}

export interface ReleaseDates {
    results: any[]
}