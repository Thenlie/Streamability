import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SeasonCardLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the season card component. To be rendered while
 * main component is loading.
 * @param count | number of card placeholders to be rendered
 * @returns {React.JSX.Element}
 */
const SeasonCardLoader: React.FC<SeasonCardLoaderProps> = ({ count }): React.JSX.Element => {
    return (
        <>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='flex flex-row'>
                    <Skeleton width={180} height={270} />
                    <div className='p-4 flex flex-col'>
                        <Skeleton className='my-2' width={150} count={1} />
                        <Skeleton className='my-2' width={275} count={1} />
                        <Skeleton className='my-2' width={400} height={150} count={1} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default SeasonCardLoader;
