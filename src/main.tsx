import React from 'react';
import ReactDOM from 'react-dom/client';
import AppWrapper from './AppWrapper';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
    DashboardGalleryScreen,
    DashboardLayout,
} from './screens';
import { loader as searchLoader } from './screens/search_results/SearchResultsScreen';
import { loader as dashGalleryLoader } from './screens/dashboard/DashboardGalleryScreen';

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
                path: '/',
                element: <FeaturedSearchScreen />,
            },
            {
                path: 'auth',
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
                path: 'details/movie/:id',
                element: <ShowDetailsScreen />,
            },
            {
                path: 'details/tv/:id',
                element: <ShowDetailsScreen />,
            },
            {
                path: 'discover',
                element: <DiscoverScreen />,
            },
        ],
    },
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
