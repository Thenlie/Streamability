import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router, RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import {
    getMovieDetails,
    getMovieRecommendations,
    getReleaseDate,
    getRuntime,
    getTvDetails,
    getTvRecommendations,
} from '../../helpers';
import { act } from 'react';
import { MOVIE_DETAIL, TRENDING_DATA, TV_DETAIL } from '../constants';
import { ShowData } from '../../types';
import { createMemoryHistory } from 'history';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getTvDetails: vi.fn()
    };
});

const tvRouter = createMemoryRouter(routes, {
    initialEntries: [`/details/tv/${TV_DETAIL.id}/seasons`],
});

describe('Seasons Screen', () => {
    it('properly renders applicable TV show data', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);

        render(
            <RouterProvider router={tvRouter} />
        );

        await screen.findByTestId('seasons-screen')
        expect(screen.getByText(TV_DETAIL.title)).toBeInTheDocument();
        expect(screen.getByText("(" + TV_DETAIL.release_date?.slice(0, 4) + ")"))
        expect(screen.getByAltText(`${TV_DETAIL.title} poster`)).toHaveAttribute('src', TMDB_BASE_PATH + TV_DETAIL.poster_path);
    })
    it('properly renders placeholder image if no poster path is provided', async () => {
        vi.mocked(getTvDetails).mockResolvedValue({ ...TV_DETAIL, poster_path: null });
        render(
            <RouterProvider router={tvRouter} />
        )

        await screen.findByTestId('seasons-screen')
        expect(screen.getByAltText(`${TV_DETAIL.title} poster`)).toHaveAttribute('src', '/poster-placeholder.jpeg')
    })
    it('properly provides link that navigates back to TV details', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);

        render(
            <RouterProvider router={tvRouter} />
        );

        await screen.findByTestId('seasons-screen')
        await act(async () => {
            fireEvent.click(await screen.findByRole('link', { name: 'Back' }));
        })
        expect(tvRouter.state.location.pathname).toBe(`/details/tv/${TV_DETAIL.id}`)
    })
})