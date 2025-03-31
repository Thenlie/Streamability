import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
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

// This needs to mock `log` since we transform LOG.error calls into console.log
const consoleErrorMock = vi.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorMsg = [
    '%c ERROR [SearchResultsHeader] No original data in local storage',
    'background: firebrick; color: white',
];

const router = createMemoryRouter(routes, {
    initialEntries: ['/search?q=iron+man'],
});

describe('Search Results Screen', () => {
    beforeEach(() => {
        // IntersectionObserver isn't available in test environment
        const mockIntersectionObserver = vi.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null,
        });
        window.IntersectionObserver = mockIntersectionObserver;
        window.history.pushState({}, '', 'search?q=iron+man');
    });
    afterAll(() => {
        consoleErrorMock.mockRestore();
    });
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
        expect(screen.getByDisplayValue('iron man')).toBeInTheDocument();
        expect(consoleErrorMock).toHaveBeenCalledWith(...consoleErrorMsg);
        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
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
        expect(screen.getByDisplayValue('iron man')).toBeInTheDocument();
        expect(
            screen.getByText('Please try again with a different keyword or check your spelling.')
        ).toBeInTheDocument();
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
        const button = screen.getByRole('button', { name: 'Return Home' });
        expect(button).toHaveTextContent('Return Home');
        expect(consoleErrorMock).toHaveBeenCalledWith(...consoleErrorMsg);
        expect(consoleErrorMock).toHaveBeenCalledTimes(2);
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
        expect(screen.getByDisplayValue('iron man')).toBeInTheDocument();
        expect(consoleErrorMock).toHaveBeenCalledWith(...consoleErrorMsg);
        expect(consoleErrorMock).toHaveBeenCalledTimes(3);
    });
});
