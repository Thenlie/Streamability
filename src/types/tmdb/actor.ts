import { MovieData } from './movie';
import { TvData } from './tv';

/**
 * Returned when 'credits' is appended to TMDB show details request
 */
export interface Actor {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id?: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

/**
 * Returned by TMDB actor detail query
 */
export interface ActorDetail {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: null;
    gender: number;
    homepage: null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
    movie_credits?: MovieCredits;
    tv_credits?: TvCredits;
}

export interface MovieCredits {
    cast: MovieData[];
    crew: MovieData[];
}

export interface TvCredits {
    cast: TvData[];
    crew: TvData[];
}
