/**
 * Object containing genre as string and TMDB genre id
 * https://developer.themoviedb.org/reference/genre-movie-list
 * https://developer.themoviedb.org/reference/genre-tv-list
 */
export interface ShowGenre {
    id: number;
    name: string;
}

/**
 * More detailed information about streaming providers
 */
export interface ShowProviderInfo {
    display_priority?: number;
    logo_path?: string;
    provider_id?: number;
    provider_name?: string;
}

/**
 * Types of streaming providers containing
 * more detailed information
 */
export interface ShowProviderDetails {
    link?: string;
    flatrate?: ShowProviderInfo[];
    rent?: ShowProviderInfo[];
    buy?: ShowProviderInfo[];
}

/**
 * Returned by getMovieProviders and getTvProviders
 * List of streaming providers organized by country
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

/**
 * Returned by getMovieDetails and getTvDetails
 * Custom type to work with both tv and movies
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
    genre_ids?: number[];
}
