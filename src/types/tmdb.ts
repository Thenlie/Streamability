interface MovieData {
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
 * Returned by movie DB find and recommendations request
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

interface ShowGenre {
    id: number;
    name: string;
}

/**
 * Returned by MovieDB details request
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

interface ShowProviderInfo {
    display_priority?: number;
    logo_path?: string;
    provider_id?: number;
    provider_name?: string;
}

interface ShowProviderDetails {
    link?: string;
    flatrate?: ShowProviderInfo[];
    rent?: ShowProviderInfo[];
    buy?: ShowProviderInfo[];
}

/**
 * Returned by getMovieProviders and getTvProviders
 */
export interface ShowProviders {
    id: number;
    results: {
        AR?: ShowProviderDetails;
        AT?: ShowProviderDetails;
        AU?: ShowProviderDetails;
        BE?: ShowProviderDetails;
        BR?: ShowProviderDetails;
        CA?: ShowProviderDetails;
        CH?: ShowProviderDetails;
        CL?: ShowProviderDetails;
        CO?: ShowProviderDetails;
        CZ?: ShowProviderDetails;
        DE?: ShowProviderDetails;
        DK?: ShowProviderDetails;
        EC?: ShowProviderDetails;
        EE?: ShowProviderDetails;
        ES?: ShowProviderDetails;
        FI?: ShowProviderDetails;
        FR?: ShowProviderDetails;
        GB?: ShowProviderDetails;
        GR?: ShowProviderDetails;
        HU?: ShowProviderDetails;
        ID?: ShowProviderDetails;
        IE?: ShowProviderDetails;
        IN?: ShowProviderDetails;
        IT?: ShowProviderDetails;
        JP?: ShowProviderDetails;
        KR?: ShowProviderDetails;
        LT?: ShowProviderDetails;
        LV?: ShowProviderDetails;
        MX?: ShowProviderDetails;
        MY?: ShowProviderDetails;
        NL?: ShowProviderDetails;
        NO?: ShowProviderDetails;
        NZ?: ShowProviderDetails;
        PE?: ShowProviderDetails;
        PH?: ShowProviderDetails;
        PL?: ShowProviderDetails;
        PT?: ShowProviderDetails;
        RO?: ShowProviderDetails;
        RU?: ShowProviderDetails;
        SE?: ShowProviderDetails;
        SG?: ShowProviderDetails;
        TH?: ShowProviderDetails;
        TR?: ShowProviderDetails;
        US?: ShowProviderDetails;
        VE?: ShowProviderDetails;
        ZA?: ShowProviderDetails;
    };
}

interface TvData {
    id: number;
    backdrop_path?: string | null;
    genre_ids?: number[];
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string | null;
    first_air_date?: string;
    name?: string;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
}

/**
 * Returned by movieDB find and recommendations request
 */
export interface TvResults {
    page?: number;
    results?: TvData[];
    total_pages?: number;
    total_results?: number;
}

/**
 * Returned by MovieDB details request
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

/**
 * Returned by getMovieDetails and getTvDetails
 * Custom type to work with both types of shows
 */
export interface ShowData {
    id: number;
    overview?: string;
    poster_path?: string | null;
    release_date?: string;
    age_rating?: string | null;
    runtime?: number;
    title?: string;
    vote_average?: number;
    vote_count?: number;
    networks?: [
        {
            name: string;
            id: number;
            logo_path: string | null;
            origin_country: string;
        },
    ];
    showType: 'movie' | 'tv';
}
