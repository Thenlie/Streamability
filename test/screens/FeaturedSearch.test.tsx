import { describe, expect, it, test } from "vitest";

// test suite
describe('Featured Screen Suite', () => {
	it.concurrent('Featured 1 Tests', async () => {
        expect(1).toBe(1);
	});
	it.concurrent('Featured 2 Tests', async () => {
        expect(1).toBe(1);
	});
});
