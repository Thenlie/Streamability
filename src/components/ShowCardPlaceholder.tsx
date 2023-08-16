import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ShowCardPlaceholderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the show card component. To be rendered while
 * main component is loading.
 * @param count | number of card placeholders to be rendered
 * @returns {JSX.Element}
 */
export default function ShowCardPlaceholder({ count }: ShowCardPlaceholderProps): JSX.Element {
    return (
        <div className='m-3 flex flex-wrap justify-center'>
            {[...Array(count)].map((x, i) => (
                <div key={i}>
                    <Skeleton width={180} height={270} className='mb-2' />
                    <Skeleton width={180} count={3} />
                </div>
            ))}
        </div>
    );
}
