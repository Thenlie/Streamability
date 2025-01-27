import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import { useInTheatersShows, useTrendingShows } from '../../hooks';
import { TRENDING_DATA } from '../constants';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useTrendingShows: vi.fn(),
        useInTheatersShows: vi.fn(),
    };
});

const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
});

describe('Featured Search Screen', () => {
    it('initially renders banner and carousel loader component', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({ trendingShows: null, loading: true });
        vi.mocked(useInTheatersShows).mockReturnValue({ inTheatersShows: null, loading: true });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner-loader')).toBeInTheDocument();
        expect(screen.getAllByTestId('show-carousel-loader')).toHaveLength(2);
    });
    it('renders banner and carousel components once loading is complete', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({
            trendingShows: TRENDING_DATA,
            loading: false,
        });
        vi.mocked(useInTheatersShows).mockReturnValue({
            inTheatersShows: TRENDING_DATA,
            loading: false,
        });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner')).toBeInTheDocument();
        expect(screen.getAllByTestId('show-carousel')).toHaveLength(2);
    });
    it('renders the banner even when no data is present', async () => {
        vi.mocked(useTrendingShows).mockReturnValue({
            trendingShows: null,
            loading: false,
        });
        vi.mocked(useInTheatersShows).mockReturnValue({
            inTheatersShows: null,
            loading: false,
        });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('featured-search-screen');
        expect(screen.getByTestId('banner')).toBeInTheDocument();
        expect(screen.getAllByTestId('empty-show-carousel')).toHaveLength(2);
    });
});
