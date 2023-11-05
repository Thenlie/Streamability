import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';

describe('Sign Up Screen', () => {
    it('renders screen with the expected inputs', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/signup'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('signup-screen');
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
});
