import { screen, waitFor } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

// open dropdown menu in top nav
const openMenu = async (user: UserEvent) => {
    await user.click(screen.getByTestId('menu-button'));
    await waitFor(() => screen.getByTestId('menu-appbar'));
};

// navigate to home screen by clicking logo in top nav
const goHome = async (user: UserEvent) => {
    await user.click(screen.getByText('Streamability'));
    await waitFor(() => screen.getByTestId('featured-search-heading'));
};

export { openMenu, goHome };
