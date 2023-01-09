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

// navigate to login screen
const goToLogin = async (user: UserEvent) => {
    await openMenu(user);
    await user.click(screen.getByText('Login'));
    await waitFor(() => screen.getByTestId('login-heading'));
};

// navigate to sign up screen
const goToSignUp = async (user: UserEvent) => {
    await openMenu(user);
    await user.click(screen.getByText('Sign Up'));
    await waitFor(() => screen.getByTestId('signup-heading'));
};

export { openMenu, goHome, goToLogin, goToSignUp };
