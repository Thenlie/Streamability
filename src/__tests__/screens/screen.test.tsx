import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { routes } from '../routes';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

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
		expect(screen.getByTestId('search-results-heading')).toBeInTheDocument(); 
	});
});
