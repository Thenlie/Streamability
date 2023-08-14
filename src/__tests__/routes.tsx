import AppWrapper from '../AppWrapper';
import { LoginForm, ShowCard, SignUpForm } from '../components';
import {
    AuthScreen,
    DashboardScreen,
    FeaturedSearchScreen,
    PageNotFoundScreen,
    SearchResultsScreen,
    ShowDetailsScreen,
} from '../screens';
import { loader as searchLoader } from '../screens/SearchResultsScreen';
import 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import sampleMovieData from './screens/assets/movieData.json';
import { ShowData } from '../types';

/**
 * Routes to be used in screen unit tests
 * Currently simulating the entire app
 */
export const routes: RouteObject[] = [
    {
        path: '/',
        element: <AppWrapper />,
        errorElement: <PageNotFoundScreen />,
        children: [
            {
                path: '/',
                element: <FeaturedSearchScreen />,
            },
            {
                path: 'auth',
                element: <AuthScreen />,
                children: [
                    {
                        path: 'login',
                        element: <LoginForm />,
                    },
                    {
                        path: 'signup',
                        element: <SignUpForm />,
                    },
                ],
            },
            {
                path: 'dashboard',
                element: <DashboardScreen />,
            },
            {
                path: 'search',
                element: <SearchResultsScreen />,
                loader: searchLoader,
            },
            {
                path: 'details/movie/:id',
                element: <ShowDetailsScreen />,
            },
        ],
    },
];

/**
 * Route to test a single movie card
 * This is needed so we have access to the userContext
 */
export const showCardRoutes: RouteObject[] = [
    {
        path: '/',
        element: <AppWrapper />,
        children: [
            {
                path: '/',
                element: (
                    <ShowCard
                        details={sampleMovieData as ShowData}
                        showType={'movie'}
                        profile={null}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        setProfile={() => {}}
                    />
                ),
            },
        ],
    },
];
