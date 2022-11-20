import '../components/SearchInput';
import SearchInput from '../components/SearchInput';

/**
 * This is currently just a minimal sample file to get the directory structure of the project set up
 * The contents of this page and its components should be updated, along with this comment :)
 * 
 * @returns {JSX.Element} | 'not logged in' search screen, the landing page of the app
 */
export default function FeaturedSearchScreen(): JSX.Element {
	return (
		<>
			<h1 data-testid="featured-search-heading">Featured Search Page</h1>
			<SearchInput />
		</>
	);
}
