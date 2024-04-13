import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { ShowPoster } from '../../components';
import { MOVIE_DETAIL, PROFILE, TV_DETAIL } from '../constants';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

describe('Show Poster Component', () => {
    it('properly renders a movie poster', () => {
        render(
            <MemoryRouter>
                <ShowPoster details={MOVIE_DETAIL} profile={PROFILE} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            TMDB_BASE_PATH + MOVIE_DETAIL.poster_path
        );
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/details/' + MOVIE_DETAIL.media_type + '/' + MOVIE_DETAIL.id
        );
    });
    it('properly renders a tv poster', () => {
        render(
            <MemoryRouter>
                <ShowPoster details={TV_DETAIL} profile={PROFILE} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            TMDB_BASE_PATH + TV_DETAIL.poster_path
        );
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/details/' + TV_DETAIL.media_type + '/' + TV_DETAIL.id
        );
    });
    it('renders placeholder poster when no poster path is provided', () => {
        render(
            <MemoryRouter>
                <ShowPoster details={{ ...MOVIE_DETAIL, poster_path: null }} profile={PROFILE} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/poster-placeholder.jpeg');
    });
    it('navigates to details screen on click', async () => {
        const user = userEvent.setup();
        const history = createMemoryHistory();
        history.push = vi.fn();

        render(
            <Router location={history.location} navigator={history}>
                <ShowPoster details={MOVIE_DETAIL} profile={PROFILE} />
            </Router>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        await user.click(screen.getByRole('img'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/details/' + MOVIE_DETAIL.media_type + '/' + MOVIE_DETAIL.id,
                search: '',
            },
            {
                ...MOVIE_DETAIL,
            },
            {
                preventScrollReset: undefined,
                relative: undefined,
                replace: false,
                state: {
                    ...MOVIE_DETAIL,
                },
            }
        );
    });
});
