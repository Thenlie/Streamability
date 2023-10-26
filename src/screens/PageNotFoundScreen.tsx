import { ErrorResponse } from '@remix-run/router';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button, OfflineSnackbar, Snackbar } from '../components';
import Logger from '../logger';
import React from 'react';
import { ArrowBack, Home } from '@mui/icons-material';
import { Typography as Typ } from '@mui/material';

const LOG = new Logger('PageNotFoundScreen');

/**
 * @returns {JSX.Element} | 404 page
 */
const PageNotFoundScreen: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    /**
     * This hook returns anything thrown during an
     * action, loader, or rendering
     */
    const error: ErrorResponse = useRouteError() as ErrorResponse;
    LOG.error(error);

    /**
     * @TODO Implement better error handling
     * @TODO Handle thrown responses with 'isRouteErrorResponse'
     * https://reactrouter.com/en/main/route/error-element#throwing-responses
     */
    return (
        <div className='flex min-h-screen flex-col place-items-center justify-center'>
            <Typ variant='h4' data-testid='page-not-found-header' sx={{ paddingBottom: 6 }}>
                Page Not Found!
            </Typ>
            <Button title='Return home' StartIcon={Home} onClick={() => navigate('/')} />
            <Button title='Go back' StartIcon={ArrowBack} onClick={() => navigate(-1)} />
            {error.statusText && (
                <Snackbar isOpen isStatic severity='error' message={error.statusText} />
            )}
            <OfflineSnackbar />
        </div>
    );
};

export default PageNotFoundScreen;
