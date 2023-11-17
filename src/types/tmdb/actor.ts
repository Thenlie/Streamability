export interface Actor {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface ActorDetail {
    credit_type: string;
    department: string;
    job: string;
    media: Media;
    media_type: string;
    id: number;
    person: Person;
}

export interface Media {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: Date;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
}

export interface Person {
    adult: boolean;
    id: number;
    name: string;
    original_name: string;
    media_type: string;
    popularity: number;
    gender: number;
    known_for_department: string;
    profile_path: string;
}
