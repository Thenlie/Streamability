import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import { ShowPoster } from '../../components';
import { MOVIE_DETAIL, PROFILE, TV_DETAIL } from '../constants';
import { MemoryRouter } from 'react-router-dom';

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
});
