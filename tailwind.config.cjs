/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'rgb(var(--color-background))',
                foreground: 'rgb(var(--color-foreground))',
                primary: 'rgb(var(--color-primary))',
                transprimary: 'rgb(var(--color-primary) / 0.5)',
                text: 'rgb(var(--color-text))',
            },
            fontFamily: {
                sans: ['Inter', 'Avenir', 'Helvetica', ...defaultTheme.fontFamily.sans],
            },
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1350px',
            '2xl': '1536px',
        },
    },
    plugins: [],
};
