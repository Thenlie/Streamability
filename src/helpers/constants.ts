export enum MOVIE_RATINGS {
    'G',
    'PG',
    'PG-13',
    'R',
}

// https://developer.themoviedb.org/reference/genre-tv-list
// https://developer.themoviedb.org/reference/genre-movie-list
export enum GENRE_IDS {
    Action = 28, // movie only
    Adventure = 12, // movie only
    ActionAdventure = 10759, // tv only
    Animation = 16,
    Comedy = 35,
    Crime = 80,
    Documentary = 99,
    Drama = 18,
    Family = 10751,
    Kids = 10762, // tv only
    Fantasy = 14, // movie only
    History = 36, // movie only
    Horror = 27, // movie only
    Music = 10402, // movie only
    Mystery = 9648,
    News = 10763, // tv only
    Reality = 10764, // tv only
    Romance = 10749, // movie only
    SciFi = 878, // movie only
    SciFiFantasy = 10765, // tv only
    Soap = 10766, // tv only
    Talk = 10767, // tv only
    TvMovie = 10770, // movie only
    Thriller = 53, // movie only
    War = 10752, // movie only
    WarPolitics = 10768, // tv only
    Western = 37,
}
