import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FeaturedSearchScreen, SearchResultsScreen, PageNotFoundScreen, LoginScreen } from './screens';

/**
 * Create the 'root route' and serve the entire app to it
 * All screens will be child routes of the root
 */
const router = createBrowserRouter([
	{
		path: '/',
		element: <AppWrapper />,
		errorElement: <PageNotFoundScreen />,
		children: [
			{
				path: '',
				element: <FeaturedSearchScreen />
			},
			{
				path: 'search/:query',
				element: <SearchResultsScreen />
			},
			{
				path: 'login',
				element: <LoginScreen />
			}
		]
	}
]);

/**
 * Create a new React root which can be used to render React elements in the browser's DOM.
 * We are using React Router so the router provider is served, 
 * which in turn serves the entire app
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
