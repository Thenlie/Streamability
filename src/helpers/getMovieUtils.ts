const getMoviesByName = async (name: string) => {
	const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIEDB_KEY}&language=en-US&query${name}&page=1&include_adult=false`);
	return response.json();

};

const getMovieDetails = async (id: number) => {
	const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIEDB_KEY}&append_to_response=images,release_dates`);
	return response.json();
};

export { getMoviesByName, getMovieDetails };