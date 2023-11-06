import React from 'react';
import ShowPosterLoader from './ShowPosterLoader';
import { getCarouselSteps } from '../ShowCarousel';
import { SHOW_POSTER_WIDTH } from '../ShowPoster';
import Carousel from 'nuka-carousel';

interface ShowCarouselLoaderProps {
    /**
     * Optional number of posters to render within the carousel.
     * Defaults to a number based on the browser window width.
     */
    steps?: number;
}

/**
 * A skeleton loader of the ShowCarousel component. To be rendered while
 * main component is loading.
 * @param steps | number of posters to render within the carousel
 */
const ShowCarouselLoader: React.FC<ShowCarouselLoaderProps> = ({ steps }) => {
    const initialCarouselSteps = getCarouselSteps({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const carouselWidth =
        (SHOW_POSTER_WIDTH * (steps || initialCarouselSteps) + 180).toString() + 'px';

    return (
        <div style={{ width: carouselWidth }} data-testid='show-carousel-loader'>
            <Carousel
                className='bg-foreground'
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
                <div className='flex justify-center'>
                    {[...Array(initialCarouselSteps)].map((x, i) => (
                        <ShowPosterLoader key={i} count={1} />
                    ))}
                </div>
            </Carousel>
        </div>
    );
};

export default ShowCarouselLoader;
