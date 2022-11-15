import { MovieData, MovieDetailsData } from '../types/tmdb';
/**
 * This function is ran after the user enters a name of a movie.
 * @returns {Promise<MovieData>} | List of movies by searched query.
 */
const getMoviesByName = async (name: string) => {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_KEY}&language=en-US&query=${name}&page=1&include_adult=false`);
	return response.json() as Promise<MovieData>;
};
/**
 * This function is ran for specific <ShowCard /> data with a movieID. 
 * @returns {Promise<MovieDetailsData>} | Specific data for a movie that is not originally supplied by getMoviesByName.
 */
const getMovieDetails = async (id: number) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIEDB_KEY}&append_to_response=images,release_dates`);
	return response.json() as Promise<MovieDetailsData>;
};

export { getMoviesByName, getMovieDetails };