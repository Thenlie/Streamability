import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

// mock MovieDB API calls
vi.mock('../../helpers/getMovieUtils', () => {
    const sampleMovieData = vi.importActual('./assets/searchData.json');
    const sampleMovieDetailsData = vi.importActual('./assets/movieData.json');
    const sampleMovieProviders = vi.importActual('./assets/providerData.json');
    return {
        default: {},
        getMoviesByName: vi.fn().mockResolvedValue(sampleMovieData),
        getMovieDetails: vi.fn().mockResolvedValue(sampleMovieDetailsData),
        getMovieProviders: vi.fn().mockResolvedValue(sampleMovieProviders)
    };
});

describe('Screen Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    beforeEach(() => {
        user = userEvent.setup();
    });
    
    it('renders featured search screen', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/']
        });
        // render screens
        render(<RouterProvider router={router}/>);

        // check landing page
        await waitFor(() => screen.getByTestId('featured-search-heading'));
        expect(screen.getByTestId('featured-search-button')).toBeInTheDocument();
        // add search input
        await user.type(screen.getByTestId('featured-search-input'), 'Iron Man');
        expect(screen.getByTestId('featured-search-input')).toHaveValue('Iron Man');
        expect(screen.getByTestId('featured-search-button')).toBeInTheDocument();
    });
    it('renders page not found screen on invalid route', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/asdf']
        });
        // render screens
        render(<RouterProvider router={router}/>); 

        // check that 404 page is displayed
        expect(screen.getByTestId('page-not-found-header')).toBeInTheDocument();
        // check that error message component is displayed
        expect(screen.getByTestId('error-message-message')).toBeInTheDocument();
    });
    it('navigates to search results page when search button clicked', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/']
        });
        // render screens
        render(<RouterProvider router={router}/>);
        
        // check landing page
        await waitFor(() => screen.getByTestId('featured-search-heading'));
        expect(screen.getByTestId('featured-search-button')).toBeInTheDocument();
        // add search input
        await user.type(screen.getByTestId('featured-search-input'), 'Iron Man');
        expect(screen.getByTestId('featured-search-input')).toHaveValue('Iron Man');
        expect(screen.getByTestId('featured-search-button')).toBeInTheDocument();
        // navigate to search results page
        await user.click(screen.getByTestId('featured-search-button'));
        await waitFor(() => screen.getByTestId('search-results-heading'));
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Search Results Page');
        // check for show card
        expect(screen.getAllByRole('heading')[1]).toHaveTextContent('Iron Man');
        // check for queue buttons
        expect(screen.getAllByRole('button')[1]).toHaveTextContent('Add to queue');
        expect(screen.getAllByRole('button')[2]).toHaveTextContent('Remove from queue');
    });
    it('navigates to show details screen when show card is clicked on', async () => {
        // create a new data router for the test
        const router = createMemoryRouter(routes, {
            initialEntries: ['/search?q=iron+man']
        });
        // render screens
        render(<RouterProvider router={router}/>);

        await waitFor(() => screen.getByTestId('search-results-heading'));
        expect(screen.getAllByRole('heading')[0]).toHaveTextContent('Search Results Page');
        // navigate to details screen
        await user.click(screen.getAllByTestId('show-details-link')[0]);
        await waitFor(() => screen.getByTestId('show-details-heading'));
        expect(screen.getByTestId('details-provider')).toBeInTheDocument();
        expect(screen.getByTestId('details-provider')).toHaveTextContent('Disney Plus');
        expect(screen.getByTestId('details-release-date')).toBeInTheDocument();
        expect(screen.getByTestId('details-release-date')).toHaveTextContent('April 30th, 2008');
    });
});
