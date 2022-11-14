import { useLoaderData, useLocation } from 'react-router-dom';
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
export async function loader({ request }: { request: Request }) {
	// get the query parameters from the URL
	const url = new URL(request.url);
	const query = url.searchParams.get('q');
	return query as string;
}

/**
 * @returns tsx of search results page after user input
 */
export default function SearchResultsScreen() {
	const query: string = useLoaderData() as string;
	const location = useLocation();
	const [search, setSearch] = useState(location.search.slice(2));
	const [data, setData] = useState<MovieData | null>(null);
	const [details, setDetails] = useState<MovieDetailsData | null>(null);

	useEffect(() => {
		console.log('hit');
		const handler = async () => {
			const movies = await getMoviesByName(search);
			setData(movies);

		};
		handler();
	}, []);

	console.log(data);
	useEffect(() => {
		const handler = async () => {
			const movies = await getMovieDetails(data!.results[0].id);
			setDetails(movies);

		};
		handler();
	}, [data]);

	console.log(details);


	return (
		<>
			<h1>Search Results Page</h1>
			<p>Query: {query}</p>
			<ShowCard details={details} />
			<ShowCarousel />
		</>
	);
}
