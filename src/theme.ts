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
        secondary: {
            main: '#7130E3',
        },
        text: {
            primary: '#000000',
        },
    },
});
