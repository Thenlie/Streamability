import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import { getTvDetails } from '../../helpers';
import { TV_DETAIL } from '../constants';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getTvDetails: vi.fn(),
    };
});

const tvRouter = createMemoryRouter(routes, {
    initialEntries: [`/details/tv/${TV_DETAIL.id}/seasons`],
});

describe('Seasons Screen', () => {
    it('properly renders TV show and season data', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);

        render(<RouterProvider router={tvRouter} />);

        await screen.findByTestId('seasons-screen');
        expect(screen.getByText(TV_DETAIL.title)).toBeInTheDocument();
        expect(screen.getByText('(' + TV_DETAIL.release_date?.slice(0, 4) + ')'));
        expect(screen.getByAltText(`${TV_DETAIL.title} poster`)).toHaveAttribute(
            'src',
            TMDB_BASE_PATH + TV_DETAIL.poster_path
        );
        expect(screen.getAllByTestId('season-card-component').length).toBe(
            TV_DETAIL.seasons?.length
        );
    });
    it('properly renders placeholder image if no poster path is provided', async () => {
        vi.mocked(getTvDetails).mockResolvedValue({ ...TV_DETAIL, poster_path: null });
        render(<RouterProvider router={tvRouter} />);

        await screen.findByTestId('seasons-screen');
        expect(screen.getByAltText(`${TV_DETAIL.title} poster`)).toHaveAttribute(
            'src',
            '/poster-placeholder.jpeg'
        );
    });
    it('page header properly provides link that navigates back to TV details', async () => {
        vi.mocked(getTvDetails).mockResolvedValue(TV_DETAIL);

        render(<RouterProvider router={tvRouter} />);

        await screen.findByTestId('seasons-screen');
        await act(async () => {
            fireEvent.click(await screen.findByRole('link', { name: 'Back to Show Details' }));
        });
        expect(tvRouter.state.location.pathname).toBe(`/details/tv/${TV_DETAIL.id}`);
    });
});
