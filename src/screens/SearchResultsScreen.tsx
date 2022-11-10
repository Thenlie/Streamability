import { useLoaderData } from 'react-router-dom';
import { ShowCard, ShowCarousel } from '../components';
import { useUserContext } from '../hooks';

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 * 
 * @param request - HTTP GET request from the SearchInput component
 * @returns the users query as a string
 */
export async function loader({request}: {request: Request} ) {
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
	const { user } = useUserContext();

	return (
		<>
			<h1>Search Results Page</h1>
			<p>Query: {query}</p>
			<p>{JSON.stringify(user)}</p>
			<ShowCard />
			<ShowCarousel />
		</>
	);
}
