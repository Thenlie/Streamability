import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounceValue from '../useDebounceValue';

describe('useDebounceValue', () => {
    it('returns the correct debounced value', () => {
        const { result } = renderHook(({ test }) => useDebounceValue(test, 250), {
            initialProps: { test: 'test' },
        });
        act(() => result);
        expect(result.current).toBe('test');
    });
    it('only updates after after elapsed time', () => {
        act(() => vi.useFakeTimers());
        const { result, rerender } = renderHook((props) => useDebounceValue(props.test, 250), {
            initialProps: { test: 'test' },
        });
        act(() => result);
        expect(result.current).toBe('test');
        act(() => rerender({ test: 'newTest' }));
        expect(result.current).toBe('test');
        act(() => vi.runAllTimers());
        expect(result.current).toBe('newTest');
    });
});
