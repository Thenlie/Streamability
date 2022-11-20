import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByName, getMovieDetails } from '../helpers/getMovieUtils';
import { ShowCard, ShowCarousel } from '../components';
import { MovieData, MovieDetailsData } from '../types/tmdb';

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 * 
 * @param request | HTTP GET request from the SearchInput component
 * @returns {Promise<string>} | the users query
 */
export async function loader({ request }: { request: Request }): Promise<string> {
	// get the query parameters from the URL
	const url = new URL(request.url);
	const query = url.searchParams.get('q');
	return query as string;
}

/**
 * @returns {JSX.Element} results page after user input
 */
export default function SearchResultsScreen(): JSX.Element {
	const query: string = useLoaderData() as string;
	const [movieData, setMovieData] = useState<MovieData | null>(null);
	const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(null);

	/** @TODO Can we combine these useEffects into one and remove the data state? */
	useEffect(() => {
		const handler = async () => {
			const movies = await getMoviesByName(query);
			setMovieData(movies);
		};
		handler();
	}, []);

	useEffect(() => {
		const handler = async () => {
			if (movieData) {
				const movies = await getMovieDetails(movieData.results[0].id);
				setMovieDetails(movies);
			}
		};
		handler();
	}, [movieData]);

	if (import.meta.env.DEV) console.log(movieData, movieDetails);

	return (
		<>
			<h1 data-testid="search-results-heading">Search Results Page</h1>
			<p>Query: {query}</p>
			<ShowCard details={movieDetails} />
			<ShowCarousel />
		</>
	);
}
