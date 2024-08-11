import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import ShowPoster from '../../components/ShowPoster';
import { MOVIE_DETAIL, PROFILE, PROFILE_ACTIONS, TV_DETAIL } from '../constants';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '../../theme';
import useTheme from '@mui/material/styles/useTheme';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';

vi.mock('@mui/material/styles/useTheme', async () => ({
    __esModule: true,
    default: vi.fn(),
}));

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
    it('renders profile buttons when logged in', async () => {
        vi.mocked(useTheme).mockReturnValue(lightTheme);
        const { rerender } = render(
            <ThemeProvider theme={lightTheme}>
                <MemoryRouter>
                    <ShowPoster
                        details={MOVIE_DETAIL}
                        profile={PROFILE}
                        profileActions={PROFILE_ACTIONS}
                        showQueueButton
                        showWatchedButton
                        showFavoritesButton
                    />
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByTestId('show-poster-component'));
        await waitFor(() => {
            expect(screen.getByTestId('button-container'));
        });
        expect(screen.getByLabelText('Remove from queue')).toBeInTheDocument();
        expect(screen.getByLabelText('Remove from watched')).toBeInTheDocument();
        expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();

        rerender(
            <ThemeProvider theme={lightTheme}>
                <MemoryRouter>
                    <ShowPoster
                        details={MOVIE_DETAIL}
                        profile={{ ...PROFILE, queue: [], watched: [], favorites: [] }}
                        profileActions={PROFILE_ACTIONS}
                        showQueueButton
                        showWatchedButton
                        showFavoritesButton
                    />
                </MemoryRouter>
            </ThemeProvider>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        fireEvent.mouseEnter(screen.getByTestId('show-poster-component'));
        await waitFor(() => {
            expect(screen.getByTestId('button-container'));
        });
        expect(screen.getByLabelText('Add to queue')).toBeInTheDocument();
        expect(screen.getByLabelText('Add to watched')).toBeInTheDocument();
        expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();
    });
    it('navigates to details screen on click', async () => {
        const history = createMemoryHistory();
        history.push = vi.fn();

        render(
            <Router location={history.location} navigator={history}>
                <ShowPoster details={MOVIE_DETAIL} profile={PROFILE} />
            </Router>
        );
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('img'));
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
