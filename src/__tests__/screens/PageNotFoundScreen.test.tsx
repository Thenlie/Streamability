import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { routes } from '../../routes';

const router = createMemoryRouter(routes, {
    initialEntries: ['/asdf'],
});

// This needs to mock `log` since we transform LOG.error calls into console.log
const consoleErrorMock = vi.spyOn(console, 'log').mockImplementation(() => {});
const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});

describe('Page Not Found Screen', () => {
    afterAll(() => {
        consoleErrorMock.mockReset();
        consoleWarnMock.mockReset();
    });
    it('renders on an invalid route', async () => {
        render(<RouterProvider router={router} />);

        await screen.findByTestId('page-not-found-screen');
        expect(screen.getByAltText('Page not found')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Return home' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
        expect(consoleErrorMock).toHaveBeenCalledWith(
            '%c ERROR [PageNotFoundScreen] Not Found',
            'background: firebrick; color: white'
        );
        expect(consoleErrorMock).toHaveBeenCalledTimes(1);
        expect(consoleWarnMock).toHaveBeenCalledWith('No routes matched location "/asdf" ');
        expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    });
});
