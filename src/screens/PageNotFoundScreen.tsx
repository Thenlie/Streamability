import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';

/**
 * @returns tsx of 404 page
 */
export default function PageNotFoundScreen() {
	/**
     * This hook returns anything thrown during an 
     * action, loader, or rendering
     */
	const error: ErrorResponse = useRouteError() as ErrorResponse;
	console.error(error);
    
	/**
     * @TODO Implement better error handling
     * @TODO Handle thrown responses with 'isRouteErrorResponse'
     * https://reactrouter.com/en/main/route/error-element#throwing-responses
     */
	return (
		<div>
			<h1>Page Not Found!</h1>
			<p>{ error.statusText }</p>
		</div>
	);
}
