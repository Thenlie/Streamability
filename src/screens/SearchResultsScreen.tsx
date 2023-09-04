import { useLoaderData } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    ShowCard,
    ShowCardProps,
    ShowCardLoader,
    ShowListCard,
    ShowListCardProps,
    ShowListCardLoader,
} from '../components';
import { ShowData } from '../types';
import { useProfileContext, useWindowSize } from '../hooks';
import { ToggleButton, Tooltip, Typography } from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import { getShowsByName } from '../helpers';

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
 * The page displayed after a user makes a search query
 *
 * @returns {JSX.Element}
 */
const SearchResultsScreen: React.FC = (): JSX.Element => {
    const query: string = useLoaderData() as string;
    const { profile, setProfile } = useProfileContext();
    const windowSize = useWindowSize();
    const [viewState, setViewState] = useState<'list' | 'grid'>('list');
    const [showDetails, setShowDetails] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // default to grid view on mobile
    useEffect(() => {
        if (windowSize.width && windowSize.width < 750) {
            setViewState('grid');
        }
    }, [windowSize]);

    useEffect(() => {
        setLoading(true);
        const handler = async () => {
            const showData: ShowData[] | null = await getShowsByName(query);
            setShowDetails(showData);
            setLoading(false);
        };
        handler();
    }, [query]);

    const handleViewToggle = useCallback(() => {
        setViewState((prev) => (prev === 'grid' ? 'list' : 'grid'));
    }, [setViewState]);

    /**
     * Heading of the screen showing the search query
     * and containing the view toggle button.
     */
    const SearchResultHeader = useMemo((): JSX.Element => {
        return (
            <div className='flex justify-between align-middle w-full p-3'>
                <Typography variant='h5' data-testid='search-results-heading'>
                    Search results for: {query}
                </Typography>
                <Tooltip title='toggle card view'>
                    <ToggleButton
                        sx={windowSize.width && windowSize.width < 750 ? { display: 'none' } : {}}
                        value='toggle card view'
                        aria-label='toggle card view'
                        onClick={handleViewToggle}
                    >
                        {viewState === 'grid' ? <ViewList /> : <ViewModule />}
                    </ToggleButton>
                </Tooltip>
            </div>
        );
    }, [query, viewState]);

    /**
     * Loops over show details and creates an array of show cards
     * using the correct component based on the `viewState`
     *
     * @returns {JSX.Element}
     */
    const SearchResultCards = useMemo((): JSX.Element => {
        const CardComp: React.FC<ShowCardProps | ShowListCardProps> = (props) => {
            return viewState === 'grid' ? <ShowCard {...props} /> : <ShowListCard {...props} />;
        };

        return (
            <div
                className={`${
                    viewState === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                        : 'flex flex-wrap justify-center'
                } pb-6
                `}
            >
                {showDetails?.map((item, i) => {
                    return (
                        <CardComp
                            key={i}
                            details={item}
                            showType={item.media_type}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    );
                })}
            </div>
        );
    }, [showDetails, viewState, profile]);

    if (loading) {
        return (
            <>
                {SearchResultHeader}
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
    }

    // TODO: #438 Handle this error better
    if (!showDetails) {
        return (
            <>
                {SearchResultHeader}
                <Typography variant='h6'>Sorry! No show data...</Typography>
            </>
        );
    }

    return (
        <>
            {SearchResultHeader}
            {SearchResultCards}
        </>
    );
};

export default SearchResultsScreen;
