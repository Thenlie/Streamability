import '@testing-library/jest-dom';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';

let user: UserEvent;
const router = createMemoryRouter(routes, {
    initialEntries: ['/signup'],
});

describe('Sign Up Screen', () => {
    beforeEach(() => {
        user = userEvent.setup();
    });

    it('renders screen with the expected inputs', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
    it('does not allow submission with all empty inputs', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('All fields must be filled out')).toBeInTheDocument();
    });
    it('does not allow submission with some empty inputs', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        await user.type(screen.getByLabelText('Email'), 'valid@email.com');
        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('All fields must be filled out')).toBeInTheDocument();
    });
    it('does not allow submission invalid email', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        await user.type(screen.getByLabelText('Email'), 'invalid@email');
        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.type(screen.getByLabelText('Confirm Password'), 'password');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('Must provide valid email')).toBeInTheDocument();
    });
    it('does not allow submission with non-matching passwords', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        await user.type(screen.getByLabelText('Email'), 'valid@email.com');
        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'password');
        await user.type(screen.getByLabelText('Confirm Password'), 'passwor');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });
    it('does not allow submission of passwords shorter than six characters', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        await user.type(screen.getByLabelText('Email'), 'valid@email.com');
        await user.type(screen.getByLabelText('Username'), 'testuser');
        await user.type(screen.getByLabelText('Password'), 'pass');
        await user.type(screen.getByLabelText('Confirm Password'), 'pass');
        await user.click(screen.getByRole('button', { name: 'Submit' }));
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
});
