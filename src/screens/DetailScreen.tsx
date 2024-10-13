import React from 'react';
import { ShowData } from '../types';
import { OfflineSnackbar } from '../components';
import { SearchResultsHeader } from './search_results';
import LoadingIndicator from '../components/LoadingIndicator';

interface Props {
    viewState: 'grid' | 'list';
    setViewState: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
    data: ShowData[] | null;
    setData: React.Dispatch<React.SetStateAction<ShowData[] | null>>;
    setHash: React.Dispatch<React.SetStateAction<number>>;
    cards: JSX.Element;
    moreToFetch: boolean;
    loadMoreRef: (node: HTMLDivElement) => void;
}

const DetailScreen: React.FC<Props> = ({
    viewState,
    setViewState,
    data,
    setData,
    setHash,
    cards,
    moreToFetch,
    loadMoreRef,
}) => {
    return (
        <>
            <SearchResultsHeader
                query={'trending'}
                viewState={viewState}
                setViewState={setViewState}
                showDetails={data}
                setShowDetails={setData}
                setHash={setHash}
                disableAlphabeticOrderFilter={true}
                disableResultTypeFilter={true}
            />
            <div>
                {cards}
                {moreToFetch && <LoadingIndicator />}{' '}
                {/* Show the indicator while more data is available */}
                <div ref={loadMoreRef}></div>
            </div>
            <OfflineSnackbar />
        </>
    );
};

export default DetailScreen;
