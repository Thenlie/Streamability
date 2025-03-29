import React from 'react';
import { WindowSize } from '../../hooks/useWindowSize';
import CardGalleryLoader from './CardGalleryLoader';

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

const SearchResultsLoader: React.FC<SearchResultsLoaderProps> = ({ viewState }) => {
    return (
        <div data-testid='search-results-loader'>
            <CardGalleryLoader viewState={viewState} />
        </div>
    );
};

export default SearchResultsLoader;
