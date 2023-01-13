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
        secondary: {
            main: '#0000ff',
        },
    },
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: '#ff0000',
        },
    },
});
