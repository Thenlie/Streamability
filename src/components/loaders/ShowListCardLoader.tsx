import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ShowListCardLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the show list card component. To be rendered while
 * the main component is loading.
 *
 * @param count | number of card placeholders to be rendered
 * @returns {JSX.Element}
 */
const ShowListCardLoader: React.FC<ShowListCardLoaderProps> = ({ count }): JSX.Element => {
    return (
        <div className='m-3 grid grid-cols-1 xl:grid-cols-2'>
            {[...Array(count)].map((x, i) => (
                <div key={i} className='w-[700px] h-[177px] flex m-1'>
                    <Skeleton width={100} height={175} />
                    <div className='ml-2 my-1 flex flex-col justify-between text-left'>
                        <div>
                            <Skeleton width={200} height={25} />
                            <Skeleton width={100} height={20} />
                            <Skeleton width={500} height={50} />
                        </div>
                        <div>
                            <Skeleton width={100} height={20} />
                            <Skeleton width={100} height={15} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShowListCardLoader;
