import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ActorCard from '../../components/ActorCard';
import { ACTOR, TMDB_IMG_BASE_PATH } from '../constants';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { vi } from 'vitest';

describe('ActorCard', () => {
    it('properly renders with all actor info and image', () => {
        render(
            <MemoryRouter>
                <ActorCard details={ACTOR} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('actor-card-component')).toBeInTheDocument();
        expect(screen.getByText(ACTOR.name)).toBeInTheDocument();
        expect(screen.getByText(ACTOR.character)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            TMDB_IMG_BASE_PATH + ACTOR.profile_path
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/details/actor/' + ACTOR.id);
    });
    it('properly renders with placeholder when no image is provided', () => {
        render(
            <MemoryRouter>
                <ActorCard details={{ ...ACTOR, profile_path: '' }} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('actor-card-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/poster-placeholder.jpeg');
        expect(screen.getByRole('link')).toHaveAttribute('href', '/details/actor/' + ACTOR.id);
    });
    it('is clickable and navigate to actor detail screen', () => {
        const history = createMemoryHistory();
        history.push = vi.fn();

        render(
            <Router location={history.location} navigator={history}>
                <ActorCard details={ACTOR} />
            </Router>
        );

        expect(screen.getByTestId('actor-card-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            TMDB_IMG_BASE_PATH + ACTOR.profile_path
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/details/actor/' + ACTOR.id);
        fireEvent.click(screen.getByRole('img'));
        expect(history.push).toHaveBeenCalledWith(
            {
                hash: '',
                pathname: '/details/actor/' + ACTOR.id,
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
