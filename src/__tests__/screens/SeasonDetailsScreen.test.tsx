import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import { getTvSeasonDetails } from '../../helpers';
import { SEASON, TV_DETAIL, TMDB_IMG_BASE_PATH } from '../constants';

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getTvSeasonDetails: vi.fn(),
    };
});

const seasonRouter = createMemoryRouter(routes, {
    initialEntries: [`/details/tv/${TV_DETAIL.id}/seasons/${SEASON.season_number}`],
});

describe('Season Details Screen', () => {
    it('properly renders season data and associated EpisodeCards', async () => {
        vi.mocked(getTvSeasonDetails).mockResolvedValue(SEASON);

        render(<RouterProvider router={seasonRouter} />);

        await screen.findByTestId('season-details-screen');
        expect(screen.getByText(SEASON.name)).toBeInTheDocument();
        expect(screen.getByText('(' + SEASON.air_date?.slice(0, 4) + ')'));
        expect(screen.getByAltText(`${SEASON.name} poster`)).toHaveAttribute(
            'src',
            TMDB_IMG_BASE_PATH + SEASON.poster_path
        );
        expect(screen.getAllByTestId('episode-card-component').length).toBe(SEASON.episode_count);
    });
    it('properly renders placeholder image if no season poster path is provided', async () => {
        vi.mocked(getTvSeasonDetails).mockResolvedValue({ ...SEASON, poster_path: null });
        render(<RouterProvider router={seasonRouter} />);

        await screen.findByTestId('season-details-screen');
        expect(screen.getByAltText(`${SEASON.name} poster`)).toHaveAttribute(
            'src',
            '/poster-placeholder.jpeg'
        );
    });
    it('properly provides link that navigates back to seasons screen', async () => {
        vi.mocked(getTvSeasonDetails).mockResolvedValue(SEASON);

        render(<RouterProvider router={seasonRouter} />);

        await screen.findByTestId('season-details-screen');
        fireEvent.click(await screen.findByRole('link', { name: 'Back to Seasons' }));
        expect(seasonRouter.state.location.pathname).toBe(`/details/tv/${TV_DETAIL.id}/seasons`);
    });
});
