import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { ShowData } from '../types';
import { getMovieTrending } from '../helpers';
import ShowCarousel from './ShowCarousel';

/**
 * Rendered when MDB returns no results for a search.
 *
 * @returns {JSX.Element} | Search Error
 */
const SearchError: React.FC = (): JSX.Element => {
    const [trending, setTrending] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {
            const movies = await getMovieTrending();
            setTrending(movies);
        };
        handler();
    }, []);

    return (
        <>
            <section className='flex flex-col my-14 m-auto text-left'>
                <div>
                    <Typography sx={{ fontSize: 30 }}>NO MATCHES FOUND</Typography>
                </div>
                <Typography>Please try another search.</Typography>
                <Typography sx={{ fontSize: 20, mt: 6 }}>
                    THESE POPULAR SHOWS MIGHT INTEREST YOU
                </Typography>
                {trending && (
                    <div className='flex'>
                        <ShowCarousel data={trending} />
                    </div>
                )}
            </section>
        </>
    );
};

export default SearchError;
