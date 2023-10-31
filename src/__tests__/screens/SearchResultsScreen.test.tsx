import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { usePaginatedData } from '../../hooks';
import { TRENDING_DATA } from '../constants';

vi.mock('../../hooks', async () => {
    return {
        useProfileContext: vi.fn().mockReturnValue({ profile: null }),
        useIsInProfileArray: vi.fn().mockReturnValue({
            isInQueue: false,
            isInFavorites: false,
            isInWatched: false,
        }),
        useWindowSize: vi.fn().mockReturnValue({ width: 500, height: 500 }),
        useNetworkStatus: vi.fn().mockReturnValue(true),
        usePaginatedData: vi.fn(),
        useProfileActions: vi.fn(),
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
    });
    it('renders empty search results when no data is returned', async () => {
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
