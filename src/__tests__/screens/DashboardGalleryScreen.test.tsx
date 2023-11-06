import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';
import { useGetProfileArray, useProfileContext, useSessionContext } from '../../hooks';
import { MOVIE_DETAIL, PROFILE, SESSION } from '../constants';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useProfileContext: vi.fn(),
        useSessionContext: vi.fn(),
        useGetProfileArray: vi.fn(),
    };
});

describe('Dashboard Screen', () => {
    it('renders login screen when no session', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: null, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: null, setSession: () => {} });
        vi.mocked(useGetProfileArray).mockReturnValue({ data: null, loading: true });

        const queueRouter = createMemoryRouter(routes, { initialEntries: ['/dashboard/queue'] });
        render(<RouterProvider router={queueRouter} />);

        await screen.findByTestId('login-screen');
    });
    it('renders queue screen when session exists', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: PROFILE, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: SESSION, setSession: () => {} });
        vi.mocked(useGetProfileArray).mockReturnValue({ data: [MOVIE_DETAIL], loading: false });

        const queueRouter = createMemoryRouter(routes, { initialEntries: ['/dashboard/queue'] });
        render(<RouterProvider router={queueRouter} />);

        await screen.findByTestId('dashboard-gallery-screen');
        expect(screen.getByText(`${PROFILE.username}'s watch queue`)).toBeInTheDocument();
        expect(screen.getAllByTestId('show-poster-component').length).toBe([MOVIE_DETAIL].length);
    });
    it('renders favorites screen when session exists', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: PROFILE, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: SESSION, setSession: () => {} });
        vi.mocked(useGetProfileArray).mockReturnValue({ data: [MOVIE_DETAIL], loading: false });

        const favoritesRouter = createMemoryRouter(routes, {
            initialEntries: ['/dashboard/favorites'],
        });
        render(<RouterProvider router={favoritesRouter} />);

        await screen.findByTestId('dashboard-gallery-screen');
        expect(screen.getByText(`${PROFILE.username}'s favorites`)).toBeInTheDocument();
        expect(screen.getAllByTestId('show-poster-component').length).toBe([MOVIE_DETAIL].length);
    });
    it('renders watched screen when session exists', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: PROFILE, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: SESSION, setSession: () => {} });
        vi.mocked(useGetProfileArray).mockReturnValue({ data: [MOVIE_DETAIL], loading: false });

        const watchedRouter = createMemoryRouter(routes, {
            initialEntries: ['/dashboard/watched'],
        });
        render(<RouterProvider router={watchedRouter} />);

        await screen.findByTestId('dashboard-gallery-screen');
        expect(screen.getByText(`${PROFILE.username}'s watched list`)).toBeInTheDocument();
        expect(screen.getAllByTestId('show-poster-component').length).toBe([MOVIE_DETAIL].length);
    });
});
