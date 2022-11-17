import { describe, expect, it, test } from "vitest";

// test suite
describe('Show Card Suite', () => {
	it.concurrent('Feature 1 Tests', async () => {
        expect(1).toBe(1);
	});
	it.concurrent('Feature 2 Test', async () => {
        expect(1).toBe(1);
	});
});
