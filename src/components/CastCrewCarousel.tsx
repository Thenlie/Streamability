import { Typography as Typ } from '@mui/material';
import ActorCard from './ActorCard';
import type { Actor } from '../types';
import { useState, useEffect } from 'react';
import { useWindowSize, useDebounceValue } from '../hooks';
import { getCarouselSteps } from './ShowCarousel';
import { SHOW_POSTER_WIDTH } from './ShowPoster';

type CombinedCrewActor = Actor & {
    job?: string;
};

/**
 * Takes a cast or crew list and combines the job & character
 * for entries with the same name
 * @param castCrew | List of cast or crew
 */
const combineDuplicateCastCrew = (castCrew: CombinedCrewActor[]) => {
    const actorList: string[] = [];
    const filteredCastCrew: CombinedCrewActor[] = [];
    castCrew.map((actor) => {
        if (actorList.includes(actor.name)) {
            const idx = filteredCastCrew.findIndex((a) => a.name === actor.name);
            filteredCastCrew[idx] = {
                ...filteredCastCrew[idx],
                job: filteredCastCrew[idx].job + ', ' + actor.job,
                character: filteredCastCrew[idx].character + ', ' + actor.character,
            };
        } else {
            actorList.push(actor.name);
            filteredCastCrew.push(actor);
        }
    });
    return filteredCastCrew;
};

interface CastCrewCarouselProps {
    /**
     * Text shown above the carousel
     */
    title: string;
    /**
     * Either the cast or the crew data
     */
    castCrew: Actor[];
    /**
     * If the data is crew, otherwise cast
     */
    isCrew: boolean;
}

const CastCrewCarousel = ({ title, castCrew, isCrew }: CastCrewCarouselProps) => {
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
                {combineDuplicateCastCrew(castCrew).map((actor, i) => {
                    return <ActorCard key={i} details={actor} isCrew={isCrew} />;
                })}
            </div>
        </section>
    );
};

export default CastCrewCarousel;
