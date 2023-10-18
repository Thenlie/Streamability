import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useWindowSize from '../useWindowSize';

describe('useWindowSize', () => {
    it('returns a valid window size object', () => {
        const { result } = renderHook(useWindowSize);
        act(() => result.current);
        expect(result.current).toHaveProperty('height');
        expect(result.current).toHaveProperty('width');
        expect(typeof result.current.height).toBe('number');
        expect(typeof result.current.width).toBe('number');
    });
});
