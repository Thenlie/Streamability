import React from 'react';
import ShowPosterLoader from './ShowPosterLoader';
import { getCarouselSteps } from '../ShowCarousel';

interface ShowCarouselLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the ShowCarousel component. To be rendered while
 * main component is loading.
 * @param count | number of card loaders to be rendered
 */
const ShowCarouselLoader: React.FC<ShowCarouselLoaderProps> = ({ count }) => {
    return (
        <div className='flex justify-center'>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='overflow-x-hidden flex'>
                    <ShowPosterLoader
                        count={getCarouselSteps({
                            width: window.innerWidth,
                            height: window.innerHeight,
                        })}
                    />
                </div>
            ))}
        </div>
    );
};

export default ShowCarouselLoader;
