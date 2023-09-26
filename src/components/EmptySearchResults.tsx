import React from 'react';
import { Typography } from '@mui/material';
import ShowCarousel from './ShowCarousel';
import useTrendingShows from '../hooks/useTrendingShows';

interface EmptySearchResultsProps {
    /**
     * String of query searched by user
     */
    query: string;
}

/**
 * Rendered when MDB returns no results for a search.
 *
 * @returns {JSX.Element} | Search Error
 */
const EmptySearchResults: React.FC<EmptySearchResultsProps> = ({ query }): JSX.Element => {
    const trending = useTrendingShows();

    return (
        <section className='flex flex-col m-auto text-left px-6'>
            <div className='flex flex-col '>
                <img src='/images/no-search-results.png' className='mb-5 w-24 inline'></img>
                <Typography sx={{ fontSize: 30 }} fontFamily={'sunday-grapes'}>
                    NO MATCHES FOUND
                </Typography>
            </div>
            <Typography>
                We couldn&apos;t find any results for
                <Typography sx={{ fontWeight: 700, display: 'inline' }}> {query}! </Typography>
                Please try again with a different keyword or check your spelling.
            </Typography>
            <Typography fontFamily={'sunday-grapes'} sx={{ fontSize: 20, my: 6 }}>
                THESE POPULAR SHOWS MIGHT INTEREST YOU
            </Typography>
            {trending && (
                <div className='flex w-full justify-center items-center'>
                    <ShowCarousel data={trending} />
                </div>
            )}
        </section>
    );
};

export default EmptySearchResults;
