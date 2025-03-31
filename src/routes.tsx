import AppWrapper from './AppWrapper';
import {
    FeaturedSearchScreen,
    SearchResultsScreen,
    PageNotFoundScreen,
    DashboardScreen,
    AuthLayout,
    LoginScreen,
    SignUpScreen,
    ShowDetailsScreen,
    DiscoverScreen,
    DiscoverDetailScreen,
    DashboardGalleryScreen,
    DashboardLayout,
    ActorDetailScreen,
    SeasonsScreen,
    SeasonDetailsScreen,
} from './screens';
import { loader as searchLoader } from './screens/search_results/SearchResultsScreen';
import { loader as dashGalleryLoader } from './screens/dashboard/DashboardGalleryScreen';
import { RouteObject } from 'react-router';

/**
 * Create the 'root' route and serve the entire app to it.
 * All screens will be children of the root.
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
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <LoginScreen />,
                    },
                    {
                        path: 'signup',
                        element: <SignUpScreen />,
                    },
                ],
            },
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: '',
                        element: <DashboardScreen />,
                    },
                    {
                        path: 'queue',
                        element: <DashboardGalleryScreen />,
                        loader: dashGalleryLoader,
                    },
                    {
                        path: 'favorites',
                        element: <DashboardGalleryScreen />,
                        loader: dashGalleryLoader,
                    },
                    {
                        path: 'watched',
                        element: <DashboardGalleryScreen />,
                        loader: dashGalleryLoader,
                    },
                ],
            },
            {
                path: 'search',
                element: <SearchResultsScreen />,
                loader: searchLoader,
            },
            {
                path: 'details',
                children: [
                    {
                        path: '',
                        element: <PageNotFoundScreen />,
                    },
                    {
                        path: 'movie/:id',
                        element: <ShowDetailsScreen />,
                    },
                    {
                        path: 'tv/:id',
                        element: <ShowDetailsScreen />,
                    },
                    {
                        path: 'tv/:id/seasons',
                        element: <SeasonsScreen />,
                    },
                    {
                        path: 'tv/:id/seasons/:num',
                        element: <SeasonDetailsScreen />,
                    },
                    {
                        path: 'actor/:id',
                        element: <ActorDetailScreen />,
                    },
                ],
            },
            {
                path: 'discover',
                element: <DiscoverScreen />,
            },
            {
                path: 'discover/:genre',
                element: <DiscoverDetailScreen />,
            },
        ],
    },
];
