import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { useTrendingShows } from '../../hooks';
import { TRENDING_DATA } from '../constants';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useTrendingShows: vi.fn(),
    };
});

describe('Featured Search Screen', () => {
    it('initially renders banner and carousel loader component', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({ trendingShows: null, loading: true });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner-loader')).toBeInTheDocument();
        expect(screen.getByTestId('show-carousel-loader')).toBeInTheDocument();
    });
    it('renders banner and carousel components once loading is complete', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({
            trendingShows: TRENDING_DATA,
            loading: false,
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner')).toBeInTheDocument();
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
    });
    it('renders the banner even when no data is present', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({
            trendingShows: null,
            loading: false,
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner')).toBeInTheDocument();
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
    });
});
