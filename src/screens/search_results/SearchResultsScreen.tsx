import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { EmptySearchResults } from '../../components';
import { ShowData } from '../../types';
import { useProfileContext, useWindowSize } from '../../hooks';
import { SvgIcon, ToggleButton, ToggleButtonGroup, Typography as Typ } from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import { getShowsByName, sortShowsAlphaAsc, sortShowsAlphaDesc } from '../../helpers';
import Logger from '../../logger';
import SearchResultCards from '../../components/SearchResultCards';
import { SearchResultsLoader } from '../loaders';

const LOG = new Logger('SearchResultsScreen');

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 *
 * @param request | HTTP GET request from the SearchInput component
 * @returns {Promise<string>} | the users query
 */
export async function loader({ request }: { request: Request }): Promise<string> {
    // get the query parameters from the URL
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.trim();
    if (!query) {
        throw new Response('Bad Request', { status: 400 });
    }
    return query as string;
}

/**
 * The page displayed after a user makes a search query.
 * A gallery of shows that are linked to detail pages.
 */
const SearchResultsScreen: React.FC = () => {
    const query: string = useLoaderData() as string;
    const windowSize = useWindowSize();
    const { profile, setProfile } = useProfileContext();
    const storageItem = localStorage.getItem('streamabilityView');
    const initialView = storageItem === 'grid' ? 'grid' : 'list';
    const [viewState, setViewState] = useState<'list' | 'grid'>(initialView);
    const [sortState, setSortState] = useState<'alpha' | 'rev' | 'none'>('none');
    const [showDetails, setShowDetails] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    if (!storageItem) localStorage.setItem('streamabilityView', initialView);

    // default to grid view on mobile
    useEffect(() => {
        if (windowSize.width && windowSize.width < 750) {
            setViewState('grid');
            localStorage.setItem('streamabilityView', 'grid');
        }
    }, [windowSize]);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            const showData: ShowData[] | null = await getShowsByName(query);
            setShowDetails(showData);
            localStorage.setItem('streamabilityUnsortedResults', JSON.stringify(showData));
            setLoading(false);
        };
        handler();
    }, [query]);

    const handleViewToggle = (view: 'grid' | 'list') => {
        setViewState(view);
        localStorage.setItem('streamabilityView', view);
    };

    const handleSortAlpha = () => {
        const sortedShows = sortShowsAlphaAsc(showDetails || []);
        setShowDetails(sortedShows);
        setSortState('alpha');
    };

    const handleSortRevAlpha = () => {
        const sortedShows = sortShowsAlphaDesc(showDetails || []);
        setShowDetails(sortedShows);
        setSortState('rev');
    };

    const handleRemoveSort = () => {
        const unsortedShows = localStorage.getItem('streamabilityUnsortedResults');
        if (!unsortedShows) {
            LOG.error('Unable to un-sort shows!');
            return;
        }
        setShowDetails(JSON.parse(unsortedShows));
        setSortState('none');
    };

    /**
     * Heading of the screen showing the search query
     * and containing the view toggle button.
     */
    const SearchResultHeader: React.FC = () => {
        return (
            <div className='flex flex-wrap justify-between align-middle w-full p-3'>
                <Typ
                    variant='h5'
                    data-testid='search-results-heading'
                    alignSelf='center'
                    margin={1}
                >
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
                        <ToggleButton
                            value='none'
                            aria-label='Remove sort'
                            onClick={handleRemoveSort}
                        >
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

    if (loading) {
        return (
            <SearchResultsLoader
                header={<SearchResultHeader />}
                windowSize={windowSize}
                viewState={viewState}
            />
        );
    }

    if (showDetails && showDetails.length === 0) {
        return <EmptySearchResults query={query} header={<SearchResultHeader />} />;
    }

    return (
        <>
            <SearchResultHeader />
            <SearchResultCards
                details={showDetails}
                viewState={viewState}
                profile={profile}
                setProfile={setProfile}
            />
        </>
    );
};

export default SearchResultsScreen;
