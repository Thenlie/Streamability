import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { usePaginatedData, useTrendingShows } from '../../hooks';
import { TRENDING_DATA } from '../constants';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useTrendingShows: vi.fn(),
        usePaginatedData: vi.fn(),
    };
});

describe('Search Results Screen', () => {
    it('initially renders loader', async () => {
        vi.mocked(usePaginatedData).mockReturnValue({
            data: null,
            setData: () => {},
            loading: true,
            moreToFetch: false,
            refetch: () => {},
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/search?q=iron+man'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('search-results-loader');
    });
    it('renders empty search results when no data is returned', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({
            trendingShows: TRENDING_DATA,
            loading: false,
        });
        vi.mocked(usePaginatedData).mockReturnValue({
            data: [],
            setData: () => {},
            loading: false,
            moreToFetch: false,
            refetch: () => {},
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/search?q=iron+man'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('empty-search-results');
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
    });
    it('renders search results gallery when data is returned', async () => {
        vi.mocked(usePaginatedData).mockReturnValue({
            data: TRENDING_DATA,
            setData: () => {},
            loading: false,
            moreToFetch: false,
            refetch: () => {},
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/search?q=iron+man'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('search-results-screen');
    });
});
