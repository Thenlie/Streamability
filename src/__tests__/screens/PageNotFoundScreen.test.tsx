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
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toEqual(3);
        expect(buttons[0]).toHaveTextContent('Return home');
        expect(buttons[1]).toHaveTextContent('Go back');
    });
});
