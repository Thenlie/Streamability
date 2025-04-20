import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import reactEslint from 'eslint-plugin-react';
import storybookEslint from 'eslint-plugin-storybook';
import prettierEslint from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tsEslint.config(
    {
        ignores: [
            '**/*.css',
            '**/*.cjs',
            '**/build/**',
            '**/dist/**',
            'storybook-static',
            '!.storybook',
        ],
    },
    eslint.configs.recommended,
    tsEslint.configs.recommended,
    reactEslint.configs.flat['jsx-runtime'],
    storybookEslint.configs['flat/recommended'],
    {
        name: 'Streamability Lint and Format',
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsEslint.parser,
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
            parserOptions: {
                project: false,
            },
        },
        plugins: {
            '@typescript-eslint': tsEslint.plugin,
        },
        rules: {
            'no-console': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
    prettierEslint
);
