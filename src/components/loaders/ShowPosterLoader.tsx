import React from 'react';
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
const ShowPosterLoader: React.FC<ShowCardLoaderProps> = ({ count }): JSX.Element => {
    return (
        <>
            <div className='flex justify-center mx-1 my-2'>
                {[...Array(count)].map((x, i) => (
                    <Skeleton key={i} width={175} height={270} className='m-1' />
                ))}
            </div>
        </>
    );
};

export default ShowPosterLoader;
