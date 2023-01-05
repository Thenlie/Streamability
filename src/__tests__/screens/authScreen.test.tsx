import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { goHome, goToLogin, goToSignUp } from '../helpers/navigation';

describe('Auth Screen Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    beforeEach(() => {
        vi.useFakeTimers();
        user = userEvent.setup({ advanceTimers: () => vi.advanceTimersByTime(1) });
    });

    it('navigates to login and sign up screen from homepage', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToLogin(user);
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        await goHome(user);
        await goToSignUp(user);
        expect(screen.getByTestId('signup-form')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
        expect(screen.getByText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Username')).toBeInTheDocument();
    });
    it('does not allow submission of incomplete login form', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToLogin(user);
        const submitBtn = screen.getByText('Submit');
        // empty form
        await user.click(submitBtn);
        const errorMsg = screen.getByTestId('error-message-message');
        expect(errorMsg).toBeInTheDocument();
        expect(errorMsg.textContent).toBe('Error! All fields must be filled out');
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        // incomplete form
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(errorMsg.textContent).toBe('Error! All fields must be filled out');
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        await user.clear(screen.getByLabelText('Email'));
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(errorMsg.textContent).toBe('Error! All fields must be filled out');
    });
    it('does not allow submission of invalid email address', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToLogin(user);
        const submitBtn = screen.getByText('Submit');

        // invalid email
        await user.type(screen.getByTestId('login-email-input'), 'invalid@email');
        await user.type(screen.getByTestId('login-password-input'), 'password');
        await user.click(submitBtn);
        const errorMsg = screen.getByTestId('error-message-message');
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(errorMsg.textContent).toBe('Error! Must provide valid email');
    });
});
