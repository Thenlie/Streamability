import Carousel from 'nuka-carousel';
import { ShowData } from '../types/tmdb';
import React, { useEffect, useState } from 'react';
import { useWindowSize, useDebounceValue } from '../hooks';
import ShowPoster, { SHOW_POSTER_WIDTH } from './ShowPoster';
import { WindowSize } from '../hooks/useWindowSize';
import { ShowPosterLoader } from './loaders';
import { Typography } from '@mui/material';
import { ProfileActions } from '../types';

interface ShowCarouselProps {
    /**
     * Array of data to populate show cards
     */
    data: ShowData[] | null;
    /**
     * Number of ShowCards to display in 1 step.
     * If `undefined` this number will be based on screen size
     */
    size?: number | undefined;
    /**
     * Text to be shown if there is no data to display
     * in the carousel
     */
    fallbackText?: string;
    /**
     * Functions to alter profile arrays
     */
    profileActions?: ProfileActions;
    /**
     * If the queue button on the show posters should be visible
     */
    showQueueButton?: boolean;
    /**
     * If the favorites button on the show posters should be visible
     */
    showFavoritesButton?: boolean;
    /**
     * If the watched button on the show posters should be visible
     */
    showWatchedButton?: boolean;
}

/**
 * Given a window size, return the appropriate number
 * of cards per slide for the carousel
 * @param windowSize | width and height of the current window
 * @returns {number} | 1-5
 */
export function getCarouselSteps(windowSize: WindowSize): number {
    if (windowSize.width && windowSize.width > 1536) {
        return 5;
    } else if (windowSize.width && windowSize.width > 1350) {
        return 4;
    } else if (windowSize.width && windowSize.width > 1024) {
        return 3;
    } else if (windowSize.width && windowSize.width > 768) {
        return 2;
    } else {
        return 1;
    }
}

/**
 * A group of Show Posters that will be rendered as a single page in the carousel
 *
 * @returns {JSX.Element} | Collection of ShowCards
 */
const CarouselChildren: React.FC<{
    data: ShowData[];
    profileActions?: ProfileActions;
    showQueueButton?: boolean;
    showFavoritesButton?: boolean;
    showWatchedButton?: boolean;
}> = ({ data, ...rest }): JSX.Element => {
    return (
        <div className='flex justify-center'>
            {data?.map((item, i) => (
                <ShowPoster key={i} details={item} showType={item.media_type} {...rest} />
            ))}
        </div>
    );
};

/**
 * Show carousels will be used throughout the site to display collections of shows
 * The scroll horizontally and contain any number of show cards
 *
 * @returns {JSX.Element} | Carousel of movie cards
 */
const ShowCarousel: React.FC<ShowCarouselProps> = ({
    data,
    size,
    fallbackText,
    ...rest
}): JSX.Element => {
    const windowSize = useWindowSize();
    const debouncedWindowSize = useDebounceValue(windowSize, 250);
    const [loading, setLoading] = useState(true);
    const [carouselSteps, setCarouselSteps] = useState<number>(
        size || getCarouselSteps(windowSize)
    );
    const [carouselWidth, setCarouselWidth] = useState<string>(
        (SHOW_POSTER_WIDTH * (size || 1) + 100).toString() + 'px'
    );

    // Delay first render to allow windowSize to load
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        if (size) {
            setCarouselSteps(size);
            setCarouselWidth((SHOW_POSTER_WIDTH * size + 100).toString() + 'px');
            return;
        }
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
        setCarouselSteps(getCarouselSteps(debouncedWindowSize));
    }, [debouncedWindowSize, size]);

    /**
     * Splits an array of shows into an array of CarouselChildren
     *
     * @param data Show
     * @returns {JSX.Element[]}
     */
    const handleDataSlice = (data: ShowData[] | null): JSX.Element[] => {
        const arr: JSX.Element[] = [];
        if (!data) return arr;
        const filteredArray = data.filter((show) => show.poster_path);
        if (data) {
            for (let i = 0; i < filteredArray.length; i += carouselSteps) {
                const chunk = filteredArray.slice(i, i + carouselSteps);
                arr.push(<CarouselChildren key={i} data={chunk} {...rest} />);
            }
        }
        return arr;
    };

    if (loading) {
        return (
            <section className='pt-12'>
                <div className={`w-[${carouselWidth}] flex justify-center`}>
                    <ShowPosterLoader count={getCarouselSteps(windowSize)} />
                </div>
            </section>
        );
    }

    if (!data || data.length === 0) {
        return (
            <section className='pt-12'>
                <div className={`w-[${carouselWidth}]`}>
                    <Carousel
                        className='bg-primary'
                        style={{
                            width: carouselWidth,
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            borderRadius: '5px',
                        }}
                        defaultControlsConfig={{
                            pagingDotsClassName: 'hidden',
                            nextButtonClassName: 'hidden',
                            prevButtonClassName: 'hidden',
                        }}
                    >
                        <Typography
                            variant='body1'
                            className={'h-[270px] text-center pt-[100px] md:pt-[120px] p-3'}
                        >
                            {fallbackText
                                ? fallbackText
                                : 'Sorry, no shows to display at this time.'}
                        </Typography>
                    </Carousel>
                </div>
            </section>
        );
    }

    return (
        <div className={`w-[${carouselWidth}]`}>
            <Carousel
                wrapAround
                className='bg-primary'
                style={{
                    width: carouselWidth,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: '5px',
                }}
                defaultControlsConfig={{
                    pagingDotsClassName: 'hidden',
                    nextButtonClassName: 'mr-3 rounded-sm hidden md:block',
                    prevButtonClassName: 'ml-3 rounded-sm hidden md:block',
                }}
            >
                {handleDataSlice(data)}
            </Carousel>
        </div>
    );
};

export default ShowCarousel;
