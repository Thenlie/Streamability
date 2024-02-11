import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { getDiscoverMovies, getDiscoverTv } from '../../helpers';
import { MOVIE_DETAIL, TRENDING_DATA, TV_DETAIL } from '../constants';
import { useTrendingShows } from '../../hooks';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useTrendingShows: vi.fn(),
    };
});

vi.mock('../../helpers', async () => {
    const actual = vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getDiscoverMovies: vi.fn(),
        getDiscoverTv: vi.fn(),
    };
});

// TODO: #851 Create global sections variable
const sections = [
    { title: 'Trending' },
    { title: 'Highest Rated' },
    { title: 'Newly Added' },
    { title: 'Action & Adventure' },
    { title: 'Comedy' },
    { title: 'Horror' },
    { title: 'Popular on Netflix' },
    { title: 'Popular on Hulu' },
    { title: 'Popular on Prime' },
];

const router = createMemoryRouter(routes, { initialEntries: ['/discover'] });

describe('Discover Screen', () => {
    vi.mocked(getDiscoverMovies).mockResolvedValue([MOVIE_DETAIL]);
    vi.mocked(getDiscoverTv).mockResolvedValue([TV_DETAIL]);
    vi.mocked(useTrendingShows).mockReturnValue({ trendingShows: TRENDING_DATA, loading: false });

    it('renders 3 banners and 9 carousels', async () => {
        render(<RouterProvider router={router} />);
        await screen.findByTestId('discover-screen');
        await screen.findAllByTestId('show-carousel');
        const banners = screen.getAllByTestId('banner');
        expect(banners).toHaveLength(3);
        const carousels = screen.getAllByTestId('show-carousel');
        expect(carousels).toHaveLength(9);
    });
    it.each(sections)('renders $title title', async ({ title }) => {
        render(<RouterProvider router={router} />);
        await screen.findByTestId('discover-screen');
        await screen.findAllByTestId('show-carousel');
        expect(await screen.findByText(title)).toBeInTheDocument();
    });
});
