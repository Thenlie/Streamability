import { Form } from 'react-router-dom';

/**
 * Currently using a react router form, 
 * this will redirect to /search?q=<input>
 * We can then pull the query from the URL
 * 
 * @returns {JSX.Element} | the main search input component
 */
export default function SearchInput(): JSX.Element {
	return (
		<>
			<Form method="get" action="/search">
				<label htmlFor="q" defaultValue={'search movies or tv shows'}></label>
				<input name="q" type="text" data-testid="featured-search-input"></input>
				<button type="submit" data-testid="featured-search-button">Search</button>
			</Form>
		</>
	);
}
