import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { goHome, openMenu } from '../helpers/navigation';

// TODO: #427 Re-enable tests when UI stable
describe.skip('Navigation Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });

    it('navigates to all buttons in nav when not logged in', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await openMenu(user);
        // check login
        await user.click(screen.getByText('Login'));
        await waitFor(() => screen.getByTestId('login-heading'));
        await goHome(user);
        await openMenu(user);
        // check sign up
        await user.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByTestId('signup-heading'));
    });
    it('renders page not found screen on invalid route', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/asdf'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        // check that 404 page is displayed
        expect(screen.getByTestId('page-not-found-header')).toBeInTheDocument();
        // check that error message component is displayed
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
    });
});
