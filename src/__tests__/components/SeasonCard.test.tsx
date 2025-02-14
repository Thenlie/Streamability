import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { SeasonCard } from '../../components/';
import { SEASON, TV_DETAIL } from '../constants';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { vi } from 'vitest';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

describe('SeasonCard', () => {
    it('properly renders with all season info and image', () => {
        render(
            <MemoryRouter>
                <SeasonCard details={SEASON} title={TV_DETAIL.title} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        expect(screen.getByText(SEASON.name)).toBeInTheDocument();
        expect(screen.getByText(SEASON.vote_average)).toBeInTheDocument();
        expect(screen.getByText(SEASON.air_date.slice(0, 4))).toBeInTheDocument();
        expect(screen.getByText(SEASON.episode_count + ' Episodes')).toBeInTheDocument();
        expect(screen.getByText(SEASON.overview)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', TMDB_BASE_PATH + SEASON.poster_path);
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/seasons/' + SEASON.season_number
        );
    });

    it('properly renders with placeholder when no image is provided', () => {
        render(
            <MemoryRouter>
                <SeasonCard details={{ ...SEASON, poster_path: '' }} title={TV_DETAIL.title} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/poster-placeholder.jpeg');
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/seasons/' + SEASON.season_number
        );
    });

    it('is clickable and navigates to season detail screen', () => {
        const history = createMemoryHistory();
        history.push = vi.fn();

        render(
            <Router location={history.location} navigator={history}>
                <SeasonCard details={SEASON} title={TV_DETAIL.title} />
            </Router>
        );

        expect(screen.getByTestId('season-card-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', TMDB_BASE_PATH + SEASON.poster_path);
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/seasons/' + SEASON.season_number
        );
        fireEvent.click(screen.getByTestId('season-card-component'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/seasons/' + SEASON.season_number,
                search: '',
            },
            undefined,
            {
                preventScrollReset: undefined,
                relative: undefined,
                replace: false,
                state: undefined,
            }
        );
    });
});
