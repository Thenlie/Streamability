
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
    backdrop_path: string;
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
        AR?: ProviderCountries[];
        AT?: ProviderCountries[];
        AU?: ProviderCountries[];
        BE?: ProviderCountries[];
        BR?: ProviderCountries[];
        CA?: ProviderCountries[];
        CH?: ProviderCountries[];
        CL?: ProviderCountries[];
        CO?: ProviderCountries[];
        CZ?: ProviderCountries[];
        DE?: ProviderCountries[];
        DK?: ProviderCountries[];
        EC?: ProviderCountries[];
        EE?: ProviderCountries[];
        ES?: ProviderCountries[];
        FI?: ProviderCountries[];
        FR?: ProviderCountries[];
        GB?: ProviderCountries[];
        GR?: ProviderCountries[];
        HU?: ProviderCountries[];
        ID?: ProviderCountries[];
        IE?: ProviderCountries[];
        IN?: ProviderCountries[];
        IT?: ProviderCountries[];
        JP?: ProviderCountries[];
        KR?: ProviderCountries[];
        LT?: ProviderCountries[];
        LV?: ProviderCountries[];
        MX?: ProviderCountries[];
        MY?: ProviderCountries[];
        NL?: ProviderCountries[];
        NO?: ProviderCountries[];
        NZ?: ProviderCountries[];
        PE?: ProviderCountries[];
        PH?: ProviderCountries[];
        PL?: ProviderCountries[];
        PT?: ProviderCountries[];
        RO?: ProviderCountries[];
        RU?: ProviderCountries[];
        SE?: ProviderCountries[];
        SG?: ProviderCountries[];
        TH?: ProviderCountries[];
        TR?: ProviderCountries[];
        US: ProviderCountries;
        VE?: ProviderCountries[];
        ZA?: ProviderCountries[];
    };
}

export interface ProviderCountries {
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
