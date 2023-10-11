import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { goHome, goToLogin, goToSignUp } from '../helpers/navigation';

// TODO: #427 Re-enable tests when UI stable
describe.skip('Auth Screen Test Suite', async () => {
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
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        // incomplete form
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        await user.clear(screen.getByLabelText('Email'));
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
    });

    it('does not allow submission of login form with invalid email address', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToLogin(user);
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(screen.getByText('Submit'));
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! Must provide valid email'
        );
    });

    it('does not allow submission of incomplete sign up form', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToSignUp(user);
        const submitBtn = screen.getByText('Submit');
        // empty form
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        // incomplete form
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        await user.type(screen.getByLabelText('Username'), 'testname');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
        act(() => {
            vi.runAllTimers();
        });
        expect(screen.queryByTestId('error-message-message')).not.toBeInTheDocument();
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(submitBtn);
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! All fields must be filled out'
        );
    });

    it('does not allow submission of sign up form with invalid email address', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToSignUp(user);
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.type(screen.getByLabelText('Username'), 'testname');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.type(screen.getByLabelText('Confirm Password'), 'drowssap');
        await user.click(screen.getByText('Submit'));
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! Must provide valid email'
        );
    });

    it('does not allow submission of sign up form with non-matching passwords', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/'],
        });
        // render screens
        render(<RouterProvider router={router} />);

        await waitFor(() => screen.getByTestId('featured-search-heading'));
        await goToSignUp(user);
        await user.type(screen.getByLabelText('Email'), 'valid@email.com');
        await user.type(screen.getByLabelText('Username'), 'testname');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.type(screen.getByLabelText('Confirm Password'), 'drowssap');
        await user.click(screen.getByText('Submit'));
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
        expect(screen.getByTestId('error-message-message').textContent).toBe(
            'Error! Passwords must match'
        );
    });
});
