import React from 'react';
import { WindowSize } from '../../hooks/useWindowSize';
import SortFilterHeader from '../../components/SortFilterHeader';
import CardGalleryLoader from './CardGalleryLoader';

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

const SearchResultsLoader: React.FC<SearchResultsLoaderProps> = ({ query, viewState }) => {
    return (
        <div data-testid='search-results-loader'>
            <SortFilterHeader
                query={query}
                viewState={viewState}
                viewStateKey={'streamabilityView'}
                disableControls
            />
            <CardGalleryLoader viewState={viewState} />
        </div>
    );
};

export default SearchResultsLoader;
