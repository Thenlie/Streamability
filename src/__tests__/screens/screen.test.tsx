import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from "vitest";
import userEvent from '@testing-library/user-event'
import { routes } from '../routes'
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import '@testing-library/jest-dom'
import { Router } from '@remix-run/router';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

describe('Screen Test Suite', async () => {
    // set up variables to be used on each test
    let user: UserEvent;
    let router: Router;
    beforeEach(() => {
        user = userEvent.setup();
    })
    
    it('renders featured search screen', async () => {
        // create a new router for the test
        router = createMemoryRouter(routes, {
            initialEntries: ['/']
        });
        // render screens
        render(<RouterProvider router={router}/>);

        // check landing page
        await waitFor(() => screen.getByTestId('featured_search_heading'));
        expect(screen.getByTestId('featured_search_button')).toBeInTheDocument();
        // add search input
        await user.type(screen.getByTestId('featured_search_input'), 'Iron Man');
        expect(screen.getByTestId('featured_search_input')).toHaveValue('Iron Man');
        expect(screen.getByTestId('featured_search_button')).toBeInTheDocument();
	});
    it('renders page not found screen on invalid route', async () => {
        // create a new router for the test
        router = createMemoryRouter(routes, {
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
        // create a new router for the test
        router = createMemoryRouter(routes, {
            initialEntries: ['/']
        });
        // render screens
        render(<RouterProvider router={router}/>);
        
        // check landing page
        await waitFor(() => screen.getByTestId('featured_search_heading'));
        expect(screen.getByTestId('featured_search_button')).toBeInTheDocument();
        // add search input
        await user.type(screen.getByTestId('featured_search_input'), 'Iron Man');
        expect(screen.getByTestId('featured_search_input')).toHaveValue('Iron Man');
        expect(screen.getByTestId('featured_search_button')).toBeInTheDocument();
        // navigate to search results page
        await user.click(screen.getByTestId('featured_search_button'));
        await waitFor(() => screen.getByTestId('search_results_heading'));
        expect(screen.getByTestId('search_results_heading')).toBeInTheDocument(); 
    });
    it('', async () => {});
    it('', async () => {});
});
