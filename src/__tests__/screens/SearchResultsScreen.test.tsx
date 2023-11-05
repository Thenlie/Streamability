import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
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

const router = createMemoryRouter(routes, {
    initialEntries: ['/search?q=iron+man'],
});

describe('Search Results Screen', () => {
    it('search results loader displayed initially when `data` is null', async () => {
        vi.mocked(usePaginatedData).mockReturnValue({
            data: null,
            setData: () => {},
            loading: true,
            moreToFetch: false,
            refetch: () => {},
        });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('search-results-loader');
        const headerText = screen.getByText('Search results for:');
        expect(headerText).toBeInTheDocument();
        expect(within(headerText).getByText('iron man')).toBeInTheDocument();
    });
    it('empty search results displayed when no data is returned', async () => {
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

        render(<RouterProvider router={router} />);

        await screen.findByTestId('empty-search-results');
        const headerText = screen.getByText('Search results for:');
        expect(headerText).toBeInTheDocument();
        expect(within(headerText).getByText('iron man')).toBeInTheDocument();
        expect(
            screen.getByText('Please try again with a different keyword or check your spelling.')
        ).toBeInTheDocument();
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Return Home' });
        expect(button).toHaveTextContent('Return Home');
    });
    it('search results gallery displayed when data is returned', async () => {
        vi.mocked(usePaginatedData).mockReturnValue({
            data: TRENDING_DATA,
            setData: () => {},
            loading: false,
            moreToFetch: false,
            refetch: () => {},
        });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('search-results-screen');
        const headerText = screen.getByText('Search results for:');
        expect(headerText).toBeInTheDocument();
        expect(within(headerText).getByText('iron man')).toBeInTheDocument();
        expect(screen.getByText('Load More')).toBeInTheDocument();
        expect(screen.getByText('Load More')).toHaveAttribute('disabled');
    });
    it('a clickable "Load More" button is displayed when `moreToFetch` is true', async () => {
        vi.mocked(usePaginatedData).mockReturnValue({
            data: TRENDING_DATA,
            setData: () => {},
            loading: false,
            moreToFetch: true,
            refetch: () => {},
        });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('search-results-screen');
        expect(screen.getByText('Load More')).toBeInTheDocument();
        expect(screen.getByText('Load More')).not.toHaveAttribute('disabled');
    });
});
