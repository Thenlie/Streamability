import ShowCardLoader from './ShowCardLoader';

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
 * @returns {JSX.Element}
 */
export default function ShowCarouselLoader({ count }: ShowCarouselLoaderProps): JSX.Element {
    return (
        <div className='m-3 flex justify-center'>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='overflow-x-hidden'>
                    <ShowCardLoader count={1} />
                </div>
            ))}
        </div>
    );
}
