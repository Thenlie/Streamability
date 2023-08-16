import { useState, useLayoutEffect } from 'react';

interface WindowSize {
    width: number | null;
    height: number | null;
}
export default function useWindowSize() {
    const [size, setSize] = useState<WindowSize>({
        width: null,
        height: null,
    });

    useLayoutEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return size;
}
