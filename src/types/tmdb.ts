
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

interface MovieReleaseDateResults {
    iso_3166_1: string;
    release_dates: MovieReleaseDates[];
}

interface MovieReleaseDates {
    certification: string;
    iso_639_1: string | null;
    note: string;
    release_date: string;
    type: number;
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
    poster_path: string | null;
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
    genres: BasicData[];
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
        results: MovieReleaseDateResults[];
    }
    revenue: number;
    runtime: number;
    spoken_languages: MovieSpokenLanguages[];
    status: string;
    tagline: string;
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
        US: ProviderDetails;
        VE?: ProviderDetails;
        ZA?: ProviderDetails;
    };
}

export interface ProviderDetails {
    link: string;
    flatrate: [{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
    }];
    rent?: [{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
    }],
    buy?: [{
        display_priority: number;
        logo_path: string;
        provider_id: number;
        provider_name: string;
    }];
}
