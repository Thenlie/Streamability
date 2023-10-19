import React from 'react';
import { ShowCarousel, Banner } from '../components';
import { useTrendingShows } from '../hooks';

/**
 * The landing page of the application which shows a show banner,
 * a search input, and trending shows in a carousel.
 */
const FeaturedSearchScreen: React.FC = () => {
    const { trendingShows } = useTrendingShows('release');

    return (
        <div className='flex-1 flex flex-col w-full'>
            <Banner
                data={trendingShows}
                title={'Search for any movie or tv show to discover streaming providers and more!'}
                renderSearchInput
                renderLogo
            />
            <div className='my-12 mx-auto'>
                <ShowCarousel data={trendingShows} />
            </div>
        </div>
    );
};

export default FeaturedSearchScreen;
