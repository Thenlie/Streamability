import React from 'react';
import { ShowCardLoader, ShowListCardLoader } from '../../components';
import { WindowSize } from '../../hooks/useWindowSize';

interface SearchResultsLoaderProps {
    /**
     * Current state of users view
     */
    viewState: 'list' | 'grid';
    /**
     * Current size of users window
     */
    windowSize: WindowSize;
}

const SearchResultsLoader: React.FC<SearchResultsLoaderProps> = ({ viewState, windowSize }) => {
    return (
        <div
            className={
                viewState === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'flex flex-wrap justify-center'
            }
        >
            {(windowSize.width && windowSize.width < 750) || viewState === 'grid' ? (
                <ShowCardLoader count={10} />
            ) : (
                <ShowListCardLoader count={10} />
            )}
        </div>
    );
};

export default SearchResultsLoader;
