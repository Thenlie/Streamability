import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';
import { useProfileContext, useSessionContext } from '../../hooks';
import { PROFILE, SESSION } from '../constants';

vi.mock('../../hooks', async () => {
    const actual = await vi.importActual('../../hooks');

    return {
        ...(actual as object),
        useProfileContext: vi.fn(),
        useSessionContext: vi.fn(),
    };
});

const router = createMemoryRouter(routes, { initialEntries: ['/dashboard'] });

describe('Dashboard Screen', () => {
    it('renders when session exists', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: PROFILE, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: SESSION, setSession: () => {} });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('dashboard-screen');
        expect(screen.getByText(PROFILE.email)).toBeInTheDocument();
        expect(screen.getByText(PROFILE.username)).toBeInTheDocument();
        expect(screen.getByText(PROFILE.country)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Edit Profile' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Delete Profile' })).toBeInTheDocument();
        expect(screen.getAllByTestId('show-carousel-loader').length).toBe(3);
    });
    it('renders login screen when no session', async () => {
        vi.mocked(useProfileContext).mockReturnValue({ profile: null, setProfile: () => {} });
        vi.mocked(useSessionContext).mockReturnValue({ session: null, setSession: () => {} });

        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
    });
});
