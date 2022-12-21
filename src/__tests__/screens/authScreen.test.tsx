import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Auth Screen Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });

    it('navigates to login and sign up screen from homepage', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        // navigate to login
        await user.click(screen.getByText('Login'));
        await waitFor(() => screen.getByTestId('login-heading'));
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        // go back to homepage
        await user.click(screen.getByText('Home'));
        await waitFor(() => screen.getByTestId('featured-search-heading'));
        // navigate to sign up
        await user.click(screen.getByText('Sign Up'));
        await waitFor(() => screen.getByTestId('signup-heading'));
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
    });
});
