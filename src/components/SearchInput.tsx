import { Form } from 'react-router-dom';

/**
 * Currently using a react router form, 
 * this will redirect to /search?q=<input>
 * We can then pull the query from the URL
 * 
 * @returns tsx of the main search input component
 */
function SearchInput() {
	return (
		<>
			<Form method="get" action="/search">
				<label htmlFor="q" defaultValue={'search movies or tv shows'}></label>
				<input name="q" type="text"></input>
				<button type="submit">Search</button>
			</Form>
		</>
	);
}

export default SearchInput;
