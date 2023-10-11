import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SearchInput } from '../../components';
import { showCardRoutes } from '../routes';

// TODO: #427 Re-enable tests when UI stable
describe.skip('Component Test Suite', () => {
    it('renders the search input component', async () => {
        // create a new data router for the test
        const router = createMemoryRouter([
            {
                path: '/',
                element: <SearchInput />,
            },
        ]);
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('search-input')).toBeInTheDocument();
        expect(screen.getByTestId('search-button')).toBeInTheDocument();
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
