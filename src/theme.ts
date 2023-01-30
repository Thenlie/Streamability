import { PaletteOptions, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        palette: PaletteOptions;
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        palette?: PaletteOptions;
    }
}

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#222222',
            light: '#444444',
            dark: '#111111',
        },
        secondary: {
            main: '#7130E3',
        },
        text: {
            primary: '#FFFFFF',
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#dddddd',
            light: '#eeeeee',
            dark: '#aaaaaa',
        },
        secondary: {
            main: '#7130E3',
        },
        text: {
            primary: '#000000',
        },
    },
});
