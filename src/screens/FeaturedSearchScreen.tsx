import React from 'react';
import { ShowCarousel, SearchInput } from '../components';
import { useTrendingShows } from '../hooks';

/**
 * This is currently just a minimal sample file to get the directory structure of the project set up
 * The contents of this page and its components should be updated, along with this comment :)
 *
 * @returns {JSX.Element} | 'not logged in' search screen, the landing page of the app
 */
const FeaturedSearchScreen: React.FC = (): JSX.Element => {
    const { trendingShows } = useTrendingShows('release');

    return (
        <div className='mt-6 flex-1 flex flex-col justify-center'>
            <img src='/images/logo-transparent.png' className='w-60 mx-auto' />
            <SearchInput />
            <div className='mt-12'>
                <ShowCarousel data={trendingShows} />
            </div>
        </div>
    );
};

export default FeaturedSearchScreen;
