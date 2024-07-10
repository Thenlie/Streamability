import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider } from '@mui/system';
import { lightTheme, darkTheme } from '../src/theme';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/index.css'

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
    ]
};

export default preview;
