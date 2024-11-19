import React from 'react';
import { ShowCardLoader, ShowListCardLoader } from '../../components';
import useWindowSize, { WindowSize } from '../../hooks/useWindowSize';
import Typ from '@mui/material/Typography';
import Typography from '@mui/material/Typography';
import { SearchResultsHeader } from '../search_results';

interface DiscoverDetailsLoaderProps {
    path: string;
    /**
     * Current state of users view
     */
    viewState: 'list' | 'grid';
}

const DiscoverDetailsLoader: React.FC<DiscoverDetailsLoaderProps> = ({
    path,
    viewState = 'list',
}) => {
    const windowSize = useWindowSize();
    return (
        <div
        className={
            viewState === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'flex flex-wrap justify-center'
        }
    >
        {(windowSize.width && windowSize.width < 750) || viewState === 'grid' ? (
            <ShowCardLoader count={12} />
        ) : (
            <ShowListCardLoader count={10} />
        )}
    </div>
    );
};

export default DiscoverDetailsLoader;
