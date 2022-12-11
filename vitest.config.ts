import { defineConfig } from 'vitest/config';

// https://vitest.dev/guide/#configuring-vitest
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: './src/__tests__/setup.ts',
        globals: true,
        watch: false
    }
});