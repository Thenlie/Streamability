import { fetch, Request, Response } from '@remix-run/web-fetch';
import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

if (!globalThis.fetch) {
    // Built-in lib.dom.d.ts expects `fetch(Request | string, ...)` but the web
    // fetch API allows a URL so @remix-run/web-fetch defines
    // `fetch(string | URL | Request, ...)`
    // @ts-expect-error not sure why we need this...
    globalThis.fetch = fetch;
    // Same as above, lib.dom.d.ts doesn't allow a URL to the Request constructor
    // @ts-expect-error not sure why we need this...
    globalThis.Request = Request;
    // web-std/fetch Response does not currently implement Response.error()
    // @ts-expect-error not sure why we need this...
    globalThis.Response = Response;
}

// https://github.com/remix-run/react-router/blob/main/packages/router/__tests__/setup.ts

// Mock matchMedia method as its not implemented in vitest
// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
beforeAll(() => {
    window.scrollTo = vi.fn();
});

// Mocking use-resize-observer which is used by nuka-carousel
const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

afterEach(() => {
    cleanup();
});

vi.stubGlobal('ResizeObserver', ResizeObserverMock);
