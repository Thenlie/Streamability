import React, { useState, useEffect } from 'react';
import { ShowCarousel, SearchInput } from '../components';
import type { ShowData } from '../types';
import { getMovieTrending, getTvTrending } from '../helpers';

/**
 * This is currently just a minimal sample file to get the directory structure of the project set up
 * The contents of this page and its components should be updated, along with this comment :)
 *
 * @returns {JSX.Element} | 'not logged in' search screen, the landing page of the app
 */
const FeaturedSearchScreen: React.FC = (): JSX.Element => {
    const [trendingShows, setTrendingShows] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {
            const movieData: ShowData[] | null = await getMovieTrending();
            const tvData: ShowData[] | null = await getTvTrending();
            if (movieData && tvData) {
                setTrendingShows([...movieData, ...tvData]);
            }
        };
        handler();
    }, []);

    return (
        <div className='mt-6 flex-1 flex flex-col justify-center'>
            <img src='/images/logo-transparent.png' className='w-60 mx-auto' />
            <SearchInput />
            <ShowCarousel data={trendingShows} />
        </div>
    );
};

export default FeaturedSearchScreen;
