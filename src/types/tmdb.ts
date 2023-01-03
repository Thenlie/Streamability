interface MovieImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string | null;
    vote_average: number;
    vote_count: number;
    width: number;
}

interface MovieSpokenLanguages {
    english_name: string;
    iso_639_1: string;
    name: string;
}

interface BasicData {
    id: number;
    name: string;
}

export interface MovieData {
    page: number;
    results: MovieResultData[];
    total_pages: number;
    total_results: number;
}

export interface MovieResultData {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids?: number[];
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
    title: string;
    episode_run_time: number;
    first_air_date: string;
    original_name: string;
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number;
    genres: BasicData[];
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
        }
    ];
    production_countries: [
        {
            iso_3166_1: string;
            name: string;
        }
    ];
    release_dates: {
        results: MovieReleaseDateResults[];
    };
    content_ratings?: {
        results: MovieReleaseDateResults[];
    };
    revenue: number;
    runtime: number;
    spoken_languages: MovieSpokenLanguages[];
    status: string;
    tagline: string;
}

interface MovieReleaseDateResults {
    iso_3166_1: string;
    release_dates: MovieReleaseDates[];
}

interface MovieReleaseDates {
    certification: string;
    iso_639_1: string;
    note: string;
    release_date: string;
    type: number;
}

interface ProviderDetails {
    link?: string;
    flatrate?: ProviderInfo[];
    rent?: ProviderInfo[];
    buy?: ProviderInfo[];
}

interface ProviderInfo {
    display_priority?: number;
    logo_path?: string;
    provider_id?: number;
    provider_name?: string;
}

export interface MovieProviders {
    id: number;
    results: {
        AR?: ProviderDetails;
        AT?: ProviderDetails;
        AU?: ProviderDetails;
        BE?: ProviderDetails;
        BR?: ProviderDetails;
        CA?: ProviderDetails;
        CH?: ProviderDetails;
        CL?: ProviderDetails;
        CO?: ProviderDetails;
        CZ?: ProviderDetails;
        DE?: ProviderDetails;
        DK?: ProviderDetails;
        EC?: ProviderDetails;
        EE?: ProviderDetails;
        ES?: ProviderDetails;
        FI?: ProviderDetails;
        FR?: ProviderDetails;
        GB?: ProviderDetails;
        GR?: ProviderDetails;
        HU?: ProviderDetails;
        ID?: ProviderDetails;
        IE?: ProviderDetails;
        IN?: ProviderDetails;
        IT?: ProviderDetails;
        JP?: ProviderDetails;
        KR?: ProviderDetails;
        LT?: ProviderDetails;
        LV?: ProviderDetails;
        MX?: ProviderDetails;
        MY?: ProviderDetails;
        NL?: ProviderDetails;
        NO?: ProviderDetails;
        NZ?: ProviderDetails;
        PE?: ProviderDetails;
        PH?: ProviderDetails;
        PL?: ProviderDetails;
        PT?: ProviderDetails;
        RO?: ProviderDetails;
        RU?: ProviderDetails;
        SE?: ProviderDetails;
        SG?: ProviderDetails;
        TH?: ProviderDetails;
        TR?: ProviderDetails;
        US?: ProviderDetails;
        VE?: ProviderDetails;
        ZA?: ProviderDetails;
    };
}

export interface TvShowData {
    page: number;
    results: TvShowDetailsData[];
    total_pages: number;
    total_results: number;
}

export interface TvShowDetailsData {
    backdrop_path: string | null;
    created_by: [
        {
            id: number;
            credit_id: string;
            name: string;
            gender: number;
            profile_path: string | null;
        }
    ];
    episode_run_time: number[];
    first_air_date: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    homepage: string;
    id: number;
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
    name: string;
    next_episode_to_air: null;
    networks: [
        {
            name: string;
            id: number;
            logo_path: string | null;
            origin_country: string;
        }
    ];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: [
        {
            id: number;
            logo_path: null | string;
            name: string;
            origin_country: string;
        }
    ];
    production_countires: [
        {
            iso_3166_1: string;
            name: string;
        }
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
        }
    ];
    spoken_languages: [
        {
            english_name: string;
            iso_639_1: string;
            name: string;
        }
    ];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    // content_ratings append to response
    content_ratings: {
        id: number;
        results: [
            {
                iso_3166_1: string;
                rating: string;
            }
        ];
    };
    release_dates: TvShowReleaseDates;
}

interface TvShowReleaseDates {
    results: [
        {
            iso_3166_1: string;
            rating: string;
        }
    ];
}

export interface ShowData {
    id: number;
    overview: string;
    poster_path: string | null;
    release_date: string;
    age_rating?: string | null;
    runtime: number | number[];
    title: string;
    vote_average: number;
    vote_count: number;
    networks?: [
        {
            name: string;
            id: number;
            logo_path: string | null;
            origin_country: string;
        }
    ];
}
