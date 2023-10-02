import React, { useEffect, useState } from 'react';
import { ShowCarousel, SearchInput } from '../components';
import { useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';

/**
 * This is currently just a minimal sample file to get the directory structure of the project set up
 * The contents of this page and its components should be updated, along with this comment :)
 *
 * @returns {JSX.Element} | 'not logged in' search screen, the landing page of the app
 */
const FeaturedSearchScreen: React.FC = (): JSX.Element => {
    const { trendingShows } = useTrendingShows('release');
    const [bannerPath, setBannerPath] = useState<string | null>(null);

    useEffect(() => {
        if (!trendingShows) return;
        const rand = Math.floor((Math.random() * trendingShows.length) / 2);
        const path =
            `https://image.tmdb.org/t/p/original${trendingShows?.[rand]?.banner_path}` || null;
        setBannerPath(path);
    }, [trendingShows]);

    return (
        <div className='flex-1 flex flex-col w-full'>
            <div
                className='p-4 rounded-b-lg w-full lg:w-3/4 bg-no-repeat bg-cover bg-top mx-auto'
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerPath})`,
                    height: 400,
                }}
            >
                <img src='/images/logo-transparent.png' className='w-60 mx-auto md:mx-0' />
                <Typ variant='h4' className='hidden md:block px-2 text-left text-white'>
                    Search for any movie or tv show to discover streaming providers and more!
                </Typ>
                <SearchInput colorOverride='white' />
            </div>
            <div className='my-12 mx-auto'>
                <ShowCarousel data={trendingShows} />
            </div>
        </div>
    );
};

export default FeaturedSearchScreen;
