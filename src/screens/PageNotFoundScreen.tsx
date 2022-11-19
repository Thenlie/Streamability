import { ErrorResponse } from '@remix-run/router';
import { useRouteError } from 'react-router-dom';
import { ErrorMessage } from '../components';

/**
 * @returns {JSX.Element} | 404 page
 */
export default function PageNotFoundScreen(): JSX.Element {
	/**
     * This hook returns anything thrown during an 
     * action, loader, or rendering
     */
	const error: ErrorResponse = useRouteError() as ErrorResponse;
	if (import.meta.env.DEV) console.error(error);
    
	/**
     * @TODO Implement better error handling
     * @TODO Handle thrown responses with 'isRouteErrorResponse'
     * https://reactrouter.com/en/main/route/error-element#throwing-responses
     */
	return (
		<div>
			<h1 data-testid="page-not-found-header">Page Not Found!</h1>
			<ErrorMessage message={error.statusText} />
		</div>
	);
}
