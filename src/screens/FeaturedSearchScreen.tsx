import React, { useEffect, useState } from 'react';
import { ShowCarousel, SearchInput } from '../components';
import { useTrendingShows } from '../hooks';
import { Typography as Typ } from '@mui/material';

/**
 * The landing page of the application which shows a show banner,
 * a search input, and trending shows in a carousel.
 */
const FeaturedSearchScreen: React.FC = () => {
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
                <img
                    src='/images/logo-transparent.png'
                    className={`w-60 mx-auto ${bannerPath && 'md:mx-0'}`}
                />
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
