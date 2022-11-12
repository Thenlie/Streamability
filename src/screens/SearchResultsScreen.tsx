import { useLoaderData } from 'react-router-dom';
import { ShowCard, ShowCarousel } from '../components';

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 * 
 * @param request | HTTP GET request from the SearchInput component
 * @returns {Promise<string>} | the users query
 */
export async function loader({request}: {request: Request} ): Promise<string> {
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

	return (
		<>
			<h1>Search Results Page</h1>
			<p>Query: {query}</p>
			<ShowCard />
			<ShowCarousel />
		</>
	);
}
