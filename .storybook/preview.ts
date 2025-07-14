import type { Preview } from '@storybook/react-vite';
import { withThemeFromJSXProvider, withThemeByClassName } from '@storybook/addon-themes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { lightTheme, darkTheme } from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [
        withThemeFromJSXProvider({
            themes: {
                light: lightTheme,
                dark: darkTheme,
            },
            defaultTheme: 'light',
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline,
        }),
        withThemeByClassName({
            themes: {
                light: 'light',
                dark: 'dark',
            },
            defaultTheme: 'light',
        }),
    ],
};

export default preview;
