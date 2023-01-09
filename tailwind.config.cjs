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
                text: 'rgb(var(--color-text))',
                highlight: 'rgb(var(--color-highlight))',
                hlhover: 'rgb(var(--color-hlhover))',
            },
            fontFamily: {
                sans: ['Inter', 'Avenir', 'Helvetica', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
