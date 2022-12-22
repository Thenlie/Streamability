import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Navigation Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });

    it('navigates to all buttons in nav', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        // check home page
        await waitFor(() => screen.getByTestId('featured-search-heading'));
        // get all elements with the "featured-search-button" testid
        const buttons = screen.getAllByTestId('featured-search-button');
        // check for the first button
        expect(buttons[0]).toBeInTheDocument();
        // open user menu
        await user.click(screen.getByTestId('menu-button'));
        // wait for the menu to be displayed
        await waitFor(() => screen.getByTestId('menu-appbar'));
        // check login
        await user.click(screen.getByText('Login'));
        await waitFor(() => screen.getByTestId('login-heading'));
        // go back to homepage
        await user.click(screen.getByText('Streamability'));
        await waitFor(() => screen.getByTestId('featured-search-heading'));
        // open user menu
        await user.click(screen.getByTestId('menu-button'));
        // wait for the menu to be displayed
        await waitFor(() => screen.getByTestId('menu-appbar'));
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
