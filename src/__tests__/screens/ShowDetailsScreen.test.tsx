import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import {
    getMovieDetails,
    getMovieRecommendations,
    getReleaseDate,
    getRuntime,
    getTvDetails,
    getTvRecommendations,
} from '../../helpers';
import { MOVIE_DETAIL, TRENDING_DATA, TV_DETAIL } from '../constants';
import { ShowData } from '../../types';

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getMovieDetails: vi.fn(),
        getTvDetails: vi.fn(),
        getMovieRecommendations: vi.fn(),
        getTvRecommendations: vi.fn(),
    };
});

const movieRouter = createMemoryRouter(routes, {
    initialEntries: [`/details/movie/${MOVIE_DETAIL.id}`],
});

const tvRouter = createMemoryRouter(routes, {
    initialEntries: [`/details/tv/${TV_DETAIL.id}`],
});

describe('Show Details Screen', () => {
    it('No details found page when nothing is returned from details query', async () => {
        vi.mocked(getMovieDetails).mockResolvedValue(null as unknown as ShowData);

        const router = createMemoryRouter(routes, {
            initialEntries: ['/details/movie/1'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('empty-show-details-screen');
        expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
        expect(
            // eslint-disable-next-line prettier/prettier
            screen.getByText('We couldn\'t find any more details for this show. Sorry about that!')
        ).toBeInTheDocument();
    });
    it('movie details properly displayed', async () => {
        vi.mocked(getMovieDetails).mockResolvedValue(MOVIE_DETAIL);
        vi.mocked(getMovieRecommendations).mockResolvedValue(null);

        render(<RouterProvider router={movieRouter} />);

        await screen.findByTestId('show-details-screen');

        expect(screen.getByTestId('empty-show-carousel')).toBeInTheDocument();
        expect(screen.getByAltText(MOVIE_DETAIL.title + ' poster')).toBeInTheDocument();
        expect(screen.getByText(MOVIE_DETAIL.title)).toBeInTheDocument();
        expect(screen.getByText(getReleaseDate(MOVIE_DETAIL) || '')).toBeInTheDocument();
        expect(screen.getByText(getRuntime(MOVIE_DETAIL) || '')).toBeInTheDocument();
        expect(screen.getByText(MOVIE_DETAIL.age_rating || '')).toBeInTheDocument();
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(screen.getByText(MOVIE_DETAIL.overview || '')).toBeInTheDocument();
        expect(screen.getByTestId('actor-card-component')).toBeInTheDocument();
    });
    it('tv details properly displayed', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);
        vi.mocked(getTvRecommendations).mockResolvedValue(null);

        render(<RouterProvider router={tvRouter} />);

        await screen.findByTestId('show-details-screen');
        expect(screen.getByTestId('empty-show-carousel')).toBeInTheDocument();
        expect(screen.getByAltText(TV_DETAIL.title + ' poster')).toBeInTheDocument();
        expect(screen.getByText(TV_DETAIL.title)).toBeInTheDocument();
        expect(screen.getByText(getReleaseDate(TV_DETAIL) || '')).toBeInTheDocument();
        expect(screen.getByText(getRuntime(TV_DETAIL) || '')).toBeInTheDocument();
        expect(screen.getByText(TV_DETAIL.age_rating!)).toBeInTheDocument();
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(screen.getByText(TV_DETAIL.overview || '')).toBeInTheDocument();
        expect(screen.getByTestId('actor-card-component')).toBeInTheDocument();
        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(await screen.findByRole('link', { name: 'View All Seasons' }));
            expect(tvRouter.state.location.pathname).toBe(`/details/tv/${TV_DETAIL.id}/seasons`);
        });
        tvRouter.state.location.pathname = `/details/tv/${TV_DETAIL.id}}`;
    });
    it('shows recommendation carousel when recommendation data is returned', async () => {
        vi.mocked(getMovieDetails).mockResolvedValue(MOVIE_DETAIL);
        vi.mocked(getMovieRecommendations).mockResolvedValue(TRENDING_DATA);

        render(<RouterProvider router={movieRouter} />);

        await screen.findByTestId('show-details-screen');
        expect(screen.getByTestId('show-carousel')).toBeInTheDocument();
        const posters = screen.getAllByTestId('show-poster-component');
        expect(posters.length).toBe(TRENDING_DATA.length);
    });
    it('shows empty recommendation carousel when no recommendation data is returned', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);
        vi.mocked(getTvRecommendations).mockResolvedValue(null);

        render(<RouterProvider router={tvRouter} />);

        await screen.findByTestId('show-details-screen');
        expect(screen.getByTestId('empty-show-carousel')).toBeInTheDocument();
        expect(
            screen.getByText('Sorry, we could not find any recommendations based on this title.')
        ).toBeInTheDocument();
    });
});
