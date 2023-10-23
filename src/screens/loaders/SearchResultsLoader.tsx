import React from 'react';
import { ShowCardLoader, ShowListCardLoader } from '../../components';
import { WindowSize } from '../../hooks/useWindowSize';
import { SearchResultsHeader } from '../search_results';

interface SearchResultsLoaderProps {
    /**
     * Search query of the results page being loaded
     */
    query: string;
    /**
     * Current state of users view
     */
    viewState: 'list' | 'grid';
    /**
     * Current size of users window
     */
    windowSize: WindowSize;
}

const SearchResultsLoader: React.FC<SearchResultsLoaderProps> = ({
    query,
    viewState,
    windowSize,
}) => {
    return (
        <>
            <SearchResultsHeader query={query} viewState={viewState} disableControls />
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
        </>
    );
};

export default SearchResultsLoader;
