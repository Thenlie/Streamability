import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ActorCardLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the actor card component. To be rendered while
 * main component is loading.
 * @param count | number of card placeholders to be rendered
 * @returns {React.JSX.Element}
 */
const ActorCardLoader: React.FC<ActorCardLoaderProps> = ({ count }): React.JSX.Element => {
    return (
        <>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='flex flex-col w-[180px] m-4'>
                    <Skeleton width={175} height={270} className='mb-2' />
                    <div className='flex flex-col text-center'>
                        <Skeleton width={150} height={25} count={1} />
                        <Skeleton width={150} count={1} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default ActorCardLoader;
