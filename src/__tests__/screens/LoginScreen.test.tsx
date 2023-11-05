import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';

describe('Login Screen', () => {
    it('renders screen with the expected inputs', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/login'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('login-screen');
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
});
