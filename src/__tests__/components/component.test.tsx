import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SearchInput, ErrorMessage } from '../../components';
import { showCardRoutes } from '../routes';

describe('Component Test Suite', () => {
    it('renders the error message component', async () => {
        // render individual component, not within a router
        render(<ErrorMessage message='test message' />);

        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message')).toHaveTextContent(
            'Error! test message'
        );
    });
    it('renders the search input component', async () => {
        // create a new data router for the test
        const router = createMemoryRouter([
            {
                path: '/',
                element: <SearchInput />,
            },
        ]);
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('featured-search-input')).toBeInTheDocument();
        expect(screen.getByTestId('featured-search-button')).toBeInTheDocument();
    });
    it('renders the show card component', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(showCardRoutes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('show-card-component')).toBeInTheDocument();
    });
});
