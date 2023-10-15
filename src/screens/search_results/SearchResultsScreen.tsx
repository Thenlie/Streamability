import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { EmptySearchResults } from '../../components';
import { ShowData } from '../../types';
import { useProfileContext, useWindowSize } from '../../hooks';
import { getShowsByName } from '../../helpers';
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
    const [showDetails, setShowDetails] = useState<{ data: ShowData[] | null; hash: number }>({
        data: null,
        hash: 0,
    });
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
            setShowDetails({ data: showData, hash: Math.random() });
            localStorage.setItem('streamabilityUnsortedResults', JSON.stringify(showData));
            setLoading(false);
        };
        handler();
    }, [query]);

    const cards = useMemo(() => {
        return (
            <SearchResultCards
                details={showDetails.data}
                viewState={viewState}
                profile={profile}
                setProfile={setProfile}
            />
        );
    }, [showDetails.data, showDetails.hash, viewState]);

    if (loading) {
        return <SearchResultsLoader query={query} windowSize={windowSize} viewState={viewState} />;
    }

    if (showDetails.data && showDetails.data.length === 0) {
        return (
            <EmptySearchResults
                query={query}
                header={
                    <SearchResultsHeader
                        query={query}
                        viewState={viewState}
                        setViewState={setViewState}
                        showDetails={showDetails}
                        setShowDetails={setShowDetails}
                    />
                }
            />
        );
    }

    return (
        <>
            <SearchResultsHeader
                query={query}
                viewState={viewState}
                setViewState={setViewState}
                showDetails={showDetails}
                setShowDetails={setShowDetails}
            />
            {cards}
        </>
    );
};

export default SearchResultsScreen;
