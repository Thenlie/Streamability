import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../routes';

describe('Page Not Found Screen', () => {
    it('renders on an invalid route', async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ['/asdf'],
        });
        render(<RouterProvider router={router} />);

        await screen.findByTestId('page-not-found-screen');
        expect(screen.getByText('Page Not Found!')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Return home' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Go back' })).toBeInTheDocument();
    });
});
