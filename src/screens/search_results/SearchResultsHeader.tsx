import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ViewModule from '@mui/icons-material/ViewModule';
import ViewList from '@mui/icons-material/ViewList';
import FilterAltOff from '@mui/icons-material/FilterAltOff';
import Tv from '@mui/icons-material/Tv';
import Movie from '@mui/icons-material/Movie';
import { ToggleButtonGroup, ToggleButton, SvgIcon, Typography as Typ } from '@mui/material';
import { useWindowSize } from '../../hooks';
import { sortShowsAlphaAsc, sortShowsAlphaDesc, filterShowsByType } from '../../helpers';
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
    viewState?: 'list' | 'grid';
    /**
     * Function to set the react state of the view
     */
    setViewState?: Dispatch<SetStateAction<'list' | 'grid'>>;
    /**
     * Data of shows returned from the requested search
     */
    showDetails?: ShowData[] | null;
    /**
     * Function to set the react state of the show data
     */
    setShowDetails?: Dispatch<SetStateAction<ShowData[] | null>>;
    /**
     * Function to trigger a re-render in the search results screen
     */
    setHash?: Dispatch<SetStateAction<number>>;
    /**
     * All controls are disabled when `true`, defaults to `false`
     */
    disableControls?: boolean;
}

interface FilterProps {
    showType: 'tv' | 'movie' | 'none';
    // more filters to add
}

/**
 * Heading of the screen showing the search query
 * and containing the view toggle button.
 */
const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
    query,
    viewState,
    setViewState,
    setShowDetails,
    setHash,
    disableControls = false,
}) => {
    const [sortState, setSortState] = useState<'alpha' | 'rev' | 'none'>('none');
    const [filterState, setFilterState] = useState<FilterProps>({ showType: 'none' });
    const windowSize = useWindowSize();
    const unsortedShows = localStorage.getItem('streamabilityUnsortedResults');

    useEffect(() => {
        if (!unsortedShows) {
            // should never be false
            LOG.error('No original data in local storage');
            return;
        }
        if (filterState.showType === 'none' && sortState === 'none') {
            // resets to original data if neither are selected
            setShowDetails?.(JSON.parse(unsortedShows));
            return;
        }

        const results: ShowData[] = [];
        if (filterState.showType !== 'none') {
            // If filter is selected, push to `results` which will become a sorted/unsorted showDetails
            const filteredShows = filterShowsByType(
                JSON.parse(unsortedShows),
                filterState.showType
            );
            results.push(...filteredShows);
        }

        if (sortState === 'alpha' && results.length > 0) {
            // If sort AND filter
            setShowDetails?.(sortShowsAlphaAsc(results));
        } else if (sortState === 'rev' && results.length > 0) {
            // if sort AND filter
            setShowDetails?.(sortShowsAlphaDesc(results));
        } else if (sortState === 'alpha') {
            // If ONLY sort
            setShowDetails?.(sortShowsAlphaAsc(JSON.parse(unsortedShows)));
        } else if (sortState === 'rev') {
            // If ONLY sort
            setShowDetails?.(sortShowsAlphaDesc(JSON.parse(unsortedShows)));
        }

        if (results.length > 0) setShowDetails?.(results);
    }, [sortState, filterState.showType]);

    const handleViewToggle = (view: 'grid' | 'list') => {
        setViewState?.(view);
        localStorage.setItem('streamabilityView', view);
        setHash?.(Math.random());
    };

    return (
        <div className='flex flex-col md:flex-row flex-wrap justify-between align-middle w-full p-3'>
            <Typ variant='h5' alignSelf='center' margin={1}>
                Search results for: <span className='underline'>{query}</span>
            </Typ>
            <div>
                <ToggleButtonGroup
                    value={filterState.showType}
                    exclusive
                    sx={{ marginRight: 2, marginBottom: 0.5 }}
                >
                    <ToggleButton
                        value='tv'
                        aria-label='filter by tv shows'
                        onClick={() => setFilterState({ showType: 'tv' })}
                        disabled={disableControls}
                    >
                        <Tv />
                    </ToggleButton>
                    <ToggleButton
                        value='movie'
                        aria-label='filter by movies'
                        onClick={() => setFilterState({ showType: 'movie' })}
                        disabled={disableControls}
                    >
                        <Movie />
                    </ToggleButton>
                    <ToggleButton
                        value='none'
                        aria-label='Remove filter'
                        onClick={() => setFilterState({ showType: 'none' })}
                        disabled={disableControls}
                    >
                        <FilterAltOff />
                    </ToggleButton>
                </ToggleButtonGroup>

                <ToggleButtonGroup value={sortState} exclusive sx={{ marginRight: 2 }}>
                    <ToggleButton
                        value='alpha'
                        aria-label='sort results alphabetically'
                        onClick={() => setSortState('alpha')}
                        disabled={disableControls}
                    >
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>Sort alphabetical ascending</title>
                                <path d='M19 17H22L18 21L14 17H17V3H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                    <ToggleButton
                        value='rev'
                        aria-label='sort results reverse alphabetically'
                        onClick={() => setSortState('rev')}
                        disabled={disableControls}
                    >
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>Sort alphabetical descending</title>
                                <path d='M19 7H22L18 3L14 7H17V21H19M11 13V15L7.67 19H11V21H5V19L8.33 15H5V13M9 3H7C5.9 3 5 3.9 5 5V11H7V9H9V11H11V5C11 3.9 10.11 3 9 3M9 7H7V5H9Z' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                    <ToggleButton
                        value={'none'}
                        aria-label='Remove sort'
                        onClick={() => setSortState('none')}
                        disabled={disableControls}
                    >
                        <SvgIcon>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                className='fill-text'
                            >
                                <title>Remove sort</title>
                                <path d='M3 13H15V11H3M3 6V8H21V6M3 18H9V16H3V18M22.54 16.88L20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.46L22.54 16.88' />
                            </svg>
                        </SvgIcon>
                    </ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    value={viewState}
                    exclusive
                    sx={windowSize.width && windowSize.width < 750 ? { display: 'none' } : {}}
                    disabled={disableControls}
                >
                    <ToggleButton
                        value='grid'
                        aria-label='switch to grid view'
                        onClick={() => handleViewToggle('grid')}
                        disabled={disableControls}
                    >
                        <ViewModule />
                    </ToggleButton>
                    <ToggleButton
                        value='list'
                        aria-label='switch to list view'
                        onClick={() => handleViewToggle('list')}
                        disabled={disableControls}
                    >
                        <ViewList />
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    );
};

export default SearchResultsHeader;
