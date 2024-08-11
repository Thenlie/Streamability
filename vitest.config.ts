import { defineConfig } from 'vitest/config';

// https://vitest.dev/guide/#configuring-vitest
export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: 'vitest.setup.ts',
        globals: true,
        watch: false,
        // Add per: https://vitest.dev/guide/common-errors.html#failed-to-terminate-worker
        pool: 'forks',
    },
});
