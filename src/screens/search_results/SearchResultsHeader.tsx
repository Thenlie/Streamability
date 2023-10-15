import React, { Dispatch, SetStateAction, useState } from 'react';
import { ViewModule, ViewList } from '@mui/icons-material';
import { ToggleButtonGroup, ToggleButton, SvgIcon, Typography as Typ } from '@mui/material';
import { useWindowSize } from '../../hooks';
import { sortShowsAlphaAsc, sortShowsAlphaDesc } from '../../helpers';
import Logger from '../../logger';
import { ShowData } from '../../types';

const LOG = new Logger('SearchResultsHeader');

interface SearchResultsHeaderProps {
    /**
     * String the user entered as a search
     */
    query: string;
    /**
     * Current state of users view
     */
    viewState: 'list' | 'grid';
    /**
     * Function to set the react state of the view
     */
    setViewState: Dispatch<SetStateAction<'list' | 'grid'>>;
    /**
     * Data of shows returned from the requested search
     */
    showDetails: { data: ShowData[] | null; hash: number };
    /**
     * Function to set the react state of the show data
     */
    setShowDetails: Dispatch<SetStateAction<{ data: ShowData[] | null; hash: number }>>;
}

/**
 * Heading of the screen showing the search query
 * and containing the view toggle button.
 */
const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
    query,
    viewState,
    setViewState,
    showDetails,
    setShowDetails,
}) => {
    const [sortState, setSortState] = useState<'alpha' | 'rev' | 'none'>('none');
    const windowSize = useWindowSize();

    const handleViewToggle = (view: 'grid' | 'list') => {
        setViewState(view);
        localStorage.setItem('streamabilityView', view);
    };

    const handleSortAlpha = () => {
        const sortedShows = sortShowsAlphaAsc(showDetails.data || []);
        setShowDetails({ data: sortedShows, hash: Math.random() });
        setSortState('alpha');
    };

    const handleSortRevAlpha = () => {
        const sortedShows = sortShowsAlphaDesc(showDetails.data || []);
        setShowDetails({ data: sortedShows, hash: Math.random() });
        setSortState('rev');
    };

    const handleRemoveSort = () => {
        const unsortedShows = localStorage.getItem('streamabilityUnsortedResults');
        if (!unsortedShows) {
            LOG.error('Unable to un-sort shows!');
            return;
        }
        setShowDetails({ data: JSON.parse(unsortedShows), hash: Math.random() });
        setSortState('none');
    };

    return (
        <div className='flex flex-wrap justify-between align-middle w-full p-3'>
            <Typ variant='h5' data-testid='search-results-heading' alignSelf='center' margin={1}>
                Search results for: <span className='underline'>{query}</span>
            </Typ>
            <div>
                <ToggleButtonGroup value={sortState} exclusive sx={{ marginRight: 2 }}>
                    <ToggleButton
                        value='alpha'
                        aria-label='sort results alphabetically'
                        onClick={handleSortAlpha}
                    >
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>sort-alphabetical-ascending</title>
                                <path d='M19 17H22L18 21L14 17H17V3H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                    <ToggleButton
                        value='rev'
                        aria-label='sort results reverse alphabetically'
                        onClick={handleSortRevAlpha}
                    >
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>sort-alphabetical-descending</title>
                                <path d='M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                    <ToggleButton value='none' aria-label='Remove sort' onClick={handleRemoveSort}>
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>sort-variant-remove</title>
                                <path d='M3 13H15V11H3M3 6V8H21V6M3 18H9V16H3V18M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.46L22.54 16.88' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={viewState}
                    exclusive
                    sx={windowSize.width && windowSize.width < 750 ? { display: 'none' } : {}}
                >
                    <ToggleButton
                        value='grid'
                        aria-label='switch to grid view'
                        onClick={() => handleViewToggle('grid')}
                    >
                        <ViewModule />
                    </ToggleButton>
                    <ToggleButton
                        value='list'
                        aria-label='switch to list view'
                        onClick={() => handleViewToggle('list')}
                    >
                        <ViewList />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default SearchResultsHeader;
