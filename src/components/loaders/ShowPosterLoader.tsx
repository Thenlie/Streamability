import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ShowCardLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the show poster component. To be rendered while
 * main component is loading.
 * @param count | number of poster placeholders to be rendered
 * @returns {JSX.Element}
 */
export default function ShowPosterLoader({ count }: ShowCardLoaderProps): JSX.Element {
    return (
        <>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='flex w-[180px] mx-1 my-2'>
                    <Skeleton width={175} height={270} className='mb-2 my-1' />
                </div>
            ))}
        </>
    );
}
