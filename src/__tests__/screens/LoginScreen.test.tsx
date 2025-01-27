import '@testing-library/jest-dom';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';

let user: UserEvent;
const router = createMemoryRouter(routes, {
    initialEntries: ['/login'],
});

describe('Login Screen', () => {
    beforeEach(() => {
        user = userEvent.setup();
    });

    it('renders screen with the expected inputs', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
    it('does not allow submission with all empty inputs', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
        await act(async () => {
            await user.click(screen.getByRole('button', { name: 'Submit' }));
        });
        expect(screen.getByText('All fields must be filled out')).toBeInTheDocument();
    });
    it('does not allow submission with one empty input', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
        await act(async () => {
            await user.type(screen.getByLabelText('Email'), 'valid@email.com');
            await user.click(screen.getByRole('button', { name: 'Submit' }));
        });
        expect(screen.getByText('All fields must be filled out')).toBeInTheDocument();
    });
    it('does not allow submission with invalid email', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
        await act(async () => {
            await user.type(screen.getByLabelText('Email'), 'invalid@email');
            await user.type(screen.getByLabelText('Password'), 'password');
            await user.click(screen.getByRole('button', { name: 'Submit' }));
        });
        expect(screen.getByText('Must provide valid email')).toBeInTheDocument();
    });
});
