import { Typography as Typ } from '@mui/material';
import ActorCard from './ActorCard';
import type { Actor } from '../types';
import { useState, useEffect } from 'react';
import { useWindowSize, useDebounceValue } from '../hooks';
import { getCarouselSteps } from './ShowCarousel';
import { SHOW_POSTER_WIDTH } from './ShowPoster';

interface CastCrewCarouselProps {
    /**
     * Text shown above the carousel
     */
    title: string;
    /**
     * Either the cast or the crew data
     */
    castCrew: Actor[];
}

const CastCrewCarousel = ({ title, castCrew }: CastCrewCarouselProps) => {
    const windowSize = useWindowSize();
    const initialCarouselSteps = getCarouselSteps({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const debouncedWindowSize = useDebounceValue(windowSize, 250);
    const [carouselWidth, setCarouselWidth] = useState<string>(
        (SHOW_POSTER_WIDTH * initialCarouselSteps + 180).toString() + 'px'
    );

    useEffect(() => {
        if (!debouncedWindowSize || debouncedWindowSize.width === null) return;
        if (debouncedWindowSize.width && debouncedWindowSize.width > 1536) {
            setCarouselWidth((SHOW_POSTER_WIDTH * 5 + 190).toString() + 'px');
        } else if (debouncedWindowSize.width && debouncedWindowSize.width > 1350) {
            setCarouselWidth((SHOW_POSTER_WIDTH * 4 + 190).toString() + 'px');
        } else if (debouncedWindowSize.width && debouncedWindowSize.width > 1024) {
            setCarouselWidth((SHOW_POSTER_WIDTH * 3 + 180).toString() + 'px');
        } else if (debouncedWindowSize.width && debouncedWindowSize.width > 768) {
            setCarouselWidth((SHOW_POSTER_WIDTH * 2 + 180).toString() + 'px');
        } else {
            setCarouselWidth((SHOW_POSTER_WIDTH * 1 + 100).toString() + 'px');
        }
    }, [debouncedWindowSize]);

    return (
        <section className='max-w-full mt-3 mx-auto' style={{ width: carouselWidth }}>
            <Typ variant='h5'>{title}</Typ>
            <div className='flex flex-nowrap overflow-x-auto w-full'>
                {castCrew.map((actor, i) => {
                    return <ActorCard key={i} details={actor} isCrew={true} />;
                })}
            </div>
        </section>
    );
};

export default CastCrewCarousel;
