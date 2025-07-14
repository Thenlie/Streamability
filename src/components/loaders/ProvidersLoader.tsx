import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ProvidersLoaderProps {
    /**
     * Number of skeleton loaders to display
     */
    count: number;
}

/**
 * A skeleton loader of the providers component. To be rendered while
 * main component is loading.
 * @param count | number placeholders to be rendered
 * @returns {React.JSX.Element}
 */
const ProvidersLoader: React.FC<ProvidersLoaderProps> = ({ count }): React.JSX.Element => {
    return (
        <div className='m-3 flex flex-wrap justify-center bg-foreground rounded-xs p-1'>
            {[...Array(count)].map((x, i) => (
                <div key={i}>
                    <Skeleton width={64} height={64} className='m-1' />
                </div>
            ))}
        </div>
    );
};

export default ProvidersLoader;
