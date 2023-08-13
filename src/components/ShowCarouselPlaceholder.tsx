import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ShowCarouselPlaceholderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the ShowCarousel component. To be rendered while
 * main component is loading.
 * @param count | number of card placeholders to be rendered
 * @returns {JSX.Element}
 */
export default function ShowCarouselPlaceholder({
    count,
}: ShowCarouselPlaceholderProps): JSX.Element {
    return (
        <div className='m-3 flex flex-wrap justify-center'>
            {[...Array(count)].map((x, i) => (
                <div key={i}>
                    <Skeleton width={325} height={270} className='mb-2 mx-2' />
                    <Skeleton width={325} count={3} className='mx-2' />
                </div>
            ))}
        </div>
    );
}
