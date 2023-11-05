import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { Button, EmptySearchResults, OfflineSnackbar } from '../../components';
import { usePaginatedData, useProfileContext, useWindowSize } from '../../hooks';
import Logger from '../../logger';
import SearchResultCards from './SearchResultsCards';
import { SearchResultsLoader } from '../loaders';
import SearchResultsHeader from './SearchResultsHeader';

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
        LOG.error('No query found!');
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
    const [hash, setHash] = useState<number>(1);
    const {
        data,
        setData,
        loading: dataLoading,
        moreToFetch,
        refetch,
    } = usePaginatedData({ query: query });

    if (!storageItem) localStorage.setItem('streamabilityView', initialView);

    // default to grid view on mobile
    useEffect(() => {
        if (windowSize.width && windowSize.width < 750) {
            setViewState('grid');
            localStorage.setItem('streamabilityView', 'grid');
        }
    }, [windowSize]);

    const cards = useMemo(() => {
        return (
            <SearchResultCards
                details={data}
                viewState={viewState}
                profile={profile}
                setProfile={setProfile}
            />
        );
    }, [data, hash, viewState, profile]);

    if (!data) {
        return <SearchResultsLoader query={query} windowSize={windowSize} viewState={viewState} />;
    }

    if (data && data.length === 0) {
        return <EmptySearchResults query={query} viewState={viewState} />;
    }

    return (
        <div className='flex flex-col items-center w-full' data-testid='search-results-screen'>
            <SearchResultsHeader
                query={query}
                viewState={viewState}
                setViewState={setViewState}
                showDetails={data}
                setShowDetails={setData}
                setHash={setHash}
            />
            {cards}
            <Button
                title='Load More'
                loading={dataLoading}
                onClick={refetch}
                disabled={!moreToFetch}
                sx={{ display: moreToFetch ? 'block' : 'none', marginBottom: 2 }}
            />
            <OfflineSnackbar />
        </div>
    );
};

export default SearchResultsScreen;
