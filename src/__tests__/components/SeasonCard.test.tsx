import '@testing-library/jest-dom';
import { fireEvent, render, screen, act } from '@testing-library/react';
import { SeasonCard } from '../../components/';
import { SEASON, TV_DETAIL, TMDB_BASE_PATH } from '../constants';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { pluralizeString } from '../../helpers';

describe('Season Card', () => {
    it('properly renders with all season info and image', () => {
        render(
            <MemoryRouter>
                <SeasonCard details={SEASON} showId={TV_DETAIL.id} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        expect(screen.getByText(SEASON.name)).toBeInTheDocument();
        expect(screen.getByText(SEASON.vote_average)).toBeInTheDocument();
        expect(screen.getByText(SEASON.air_date!.slice(0, 4))).toBeInTheDocument();
        expect(
            screen.getByText(
                `${SEASON.episode_count} ${pluralizeString(SEASON.episode_count, 'Episode')}`
            )
        ).toBeInTheDocument();
        expect(screen.getByText(SEASON.overview)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', TMDB_BASE_PATH + SEASON.poster_path);
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            `/details/tv/${TV_DETAIL.id}/seasons/${SEASON.season_number}`
        );
    });
    it('properly renders with placeholder poster and fallback text for specials seasons', () => {
        render(
            <MemoryRouter>
                <SeasonCard
                    details={{ ...SEASON, poster_path: '', season_number: 0 }}
                    title={TV_DETAIL.title}
                    showId={TV_DETAIL.id}
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/poster-placeholder.jpeg');
        expect(
            screen.getByText(
                `Special episodes including behind the scenes footage of ${TV_DETAIL.title}.`
            )
        );
    });
    it('is clickable and navigates to season details screen', async () => {
        const history = createMemoryHistory();
        history.push(`/details/tv/${TV_DETAIL.id}`);

        render(
            <Router location={history.location} navigator={history}>
                <SeasonCard details={SEASON} showId={TV_DETAIL.id} />
            </Router>
        );

        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            `/details/tv/${TV_DETAIL.id}/seasons/${SEASON.season_number}`
        );
        await act(async () => {
            fireEvent.click(screen.getByRole('link'));
            expect(history.location.pathname).toBe(
                `/details/tv/${TV_DETAIL.id}/seasons/${SEASON.season_number}`
            );
        });
    });
});
