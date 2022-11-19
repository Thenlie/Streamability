import AppWrapper from '../AppWrapper';
import { LoginForm, SignUpForm } from '../components';
import { AuthScreen, DashboardScreen, FeaturedSearchScreen, PageNotFoundScreen, SearchResultsScreen } from '../screens';
import { loader as searchLoader } from '../screens/SearchResultsScreen';
import 'react-router-dom';
import { RouteObject } from 'react-router-dom';

/**
 * Routes to be used in screen unit tests
 * Currently simulating the entire app
 */
export const routes: RouteObject[] = [{
	path: '/',
	element: <AppWrapper />,
	errorElement: <PageNotFoundScreen />,
	children: [
		{
			path: '/',
			element: <FeaturedSearchScreen />
		},
		{
			path: 'auth',
			element: <AuthScreen />,
			children: [
				{
					path: 'login',
					element: <LoginForm />
				},
				{
					path: 'signup',
					element: <SignUpForm />
				},
			]
		},
		{
			path: 'dashboard',
			element: <DashboardScreen />
		},
		{
			path: 'search',
			element: <SearchResultsScreen />,
			loader: searchLoader
		} 
	]
}];