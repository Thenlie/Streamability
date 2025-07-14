import { Carousel } from 'nuka-carousel';
import { ShowData } from '../types/tmdb';
import React, { useEffect, useState } from 'react';
import { useWindowSize, useDebounceValue } from '../hooks';
import ShowPoster, { SHOW_POSTER_WIDTH } from './ShowPoster';
import { WindowSize } from '../hooks/useWindowSize';
import { ShowCarouselLoader } from './loaders';
import Typ from '@mui/material/Typography';
import { Profile, ProfileActions } from '../types';
import Button from './Button';

interface ShowCarouselProps {
    /**
     * Array of data to populate show cards
     */
    data: ShowData[] | null;
    /**
     * If data being passed in is still loading
     */
    dataLoading?: boolean;
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
     * Options used when displaying a header on the carousel.
     * This can contain a label and/or button.
     */
    headerProps?: {
        title: string;
        hasButton?: boolean;
        buttonTitle?: string;
        onClick?: () => void;
    };
    /**
     * User profile if logged in, otherwise `null`
     */
    profile?: Profile | null;
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
 */
const CarouselChildren: React.FC<{
    data: ShowData[];
    profile?: Profile | null;
    profileActions?: ProfileActions;
    showQueueButton?: boolean;
    showFavoritesButton?: boolean;
    showWatchedButton?: boolean;
}> = ({ data, profile = null, ...rest }): React.JSX.Element => {
    return (
        <div className='flex justify-center'>
            {data?.map((item, i) => (
                <ShowPoster key={i} details={item} profile={profile} {...rest} />
            ))}
        </div>
    );
};

/**
 * The optional label and button for the carousel
 */
const CarouselHeader: React.FC<{
    title: string;
    hasButton?: boolean;
    buttonTitle?: string;
    onClick?: () => void;
}> = ({ title, hasButton = false, buttonTitle, onClick }) => {
    return (
        <div className='flex justify-between'>
            <div className='bg-foreground p-2 relative w-60 ml-6 rounded-t-lg' id='carousel-tab'>
                <Typ variant='h6' align='center'>
                    {title}
                </Typ>
            </div>
            {hasButton && buttonTitle && (
                <Button
                    title={buttonTitle}
                    sx={{ margin: 1, minWidth: 150, minHeight: 30 }}
                    onClick={onClick}
                />
            )}
        </div>
    );
};

/**
 * Show carousels will be used throughout the site to display collections of shows
 * The scroll horizontally and contain any number of show cards
 */
const ShowCarousel: React.FC<ShowCarouselProps> = ({
    data,
    dataLoading = false,
    size,
    fallbackText,
    headerProps,
    ...rest
}): React.JSX.Element => {
    const windowSize = useWindowSize();
    const initialCarouselSteps = getCarouselSteps({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const debouncedWindowSize = useDebounceValue(windowSize, 250);
    const [carouselSteps, setCarouselSteps] = useState<number>(size || initialCarouselSteps);
    const [carouselWidth, setCarouselWidth] = useState<string>(
        (SHOW_POSTER_WIDTH * (size || initialCarouselSteps) + 180).toString() + 'px'
    );

    useEffect(() => {
        if (size) {
            setCarouselSteps(size);
            setCarouselWidth((SHOW_POSTER_WIDTH * size + 100).toString() + 'px');
            return;
        }
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
        setCarouselSteps(getCarouselSteps(debouncedWindowSize));
    }, [debouncedWindowSize, size]);

    /**
     * Splits an array of shows into an array of CarouselChildren
     * @param data Array of shows
     * @returns {React.JSX.Element[]}
     */
    const handleDataSlice = (data: ShowData[] | null): React.JSX.Element[] => {
        const arr: React.JSX.Element[] = [];
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

    if (dataLoading) {
        return <ShowCarouselLoader />;
    }

    if (!data || data.length === 0) {
        return (
            <div
                style={{ width: carouselWidth }}
                className='flex flex-col'
                data-testid='empty-show-carousel'
            >
                {headerProps && <CarouselHeader {...headerProps} />}
                <Carousel
                    className={`bg-foreground py-4 px-4 rounded-md w-[${carouselWidth}]`}
                    showArrows={false}
                    showDots={false}
                >
                    <Typ
                        variant='body1'
                        className={'h-[270px] text-center pt-[100px] md:pt-[120px] p-3 w-full'}
                    >
                        {fallbackText ? fallbackText : 'Sorry, no shows to display at this time.'}
                    </Typ>
                </Carousel>
            </div>
        );
    }

    return (
        <div style={{ width: carouselWidth }} data-testid='show-carousel'>
            {headerProps && <CarouselHeader {...headerProps} />}
            <Carousel
                wrapMode='wrap'
                scrollDistance={'slide'}
                className={`bg-foreground py-4 px-4 rounded-md w-[${carouselWidth}]`}
                showDots={false}
                showArrows
            >
                {handleDataSlice(data)}
            </Carousel>
        </div>
    );
};

export default ShowCarousel;
