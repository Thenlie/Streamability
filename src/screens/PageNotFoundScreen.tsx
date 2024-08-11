import { ErrorResponse } from '@remix-run/router';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button, Footer, Navigation, OfflineSnackbar } from '../components';
import Logger from '../logger';
import React, { useState } from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Home from '@mui/icons-material/Home';
import type { Theme } from '@mui/material';
import { darkTheme, lightTheme } from '../theme';

const LOG = new Logger('PageNotFoundScreen');

/**
 * 404 page, returned when an invalid endpoint is hit
 */
const PageNotFoundScreen: React.FC = () => {
    const navigate = useNavigate();
    const [theme, setTheme] = useState<Theme>(darkTheme);

    /**
     * This hook returns anything thrown during an
     * action, loader, or rendering
     */
    const error: ErrorResponse = useRouteError() as ErrorResponse;
    LOG.error(error.statusText);

    // Handle theme switched by browser or user on site
    const themeSwitcher = () => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && document.documentElement.classList.contains('dark'))
        ) {
            localStorage.theme = 'light';
            setTheme(lightTheme);
        } else {
            localStorage.theme = 'dark';
            setTheme(darkTheme);
        }
        document.documentElement.classList.toggle('dark');
    };

    /**
     * @TODO Implement better error handling
     * @TODO Handle thrown responses with 'isRouteErrorResponse'
     * https://reactrouter.com/en/main/route/error-element#throwing-responses
     */
    return (
        <main
            className='flex min-h-screen flex-col place-items-center'
            data-testid='page-not-found-screen'
        >
            <Navigation session={null} switchTheme={themeSwitcher} theme={theme} />
            <div className='flex-1 flex flex-col items-center justify-center'>
                <img src='/images/404.svg' width={500} className='p-6' alt='Page not found' />
                <Button title='Return home' StartIcon={Home} onClick={() => navigate('/')} />
                <Button title='Go Back' StartIcon={ArrowBack} onClick={() => navigate(-1)} />
                <OfflineSnackbar />
            </div>
            <Footer />
        </main>
    );
};

export default PageNotFoundScreen;
