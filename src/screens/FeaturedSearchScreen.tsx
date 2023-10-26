import React from 'react';
import { ShowCarousel, Banner, Snackbar } from '../components';
import { useTrendingShows, useNetworkStatus } from '../hooks';

/**
 * The landing page of the application which shows a show banner,
 * a search input, and trending shows in a carousel.
 */
const FeaturedSearchScreen: React.FC = () => {
    const { trendingShows, loading } = useTrendingShows('release');
    const isOnline = useNetworkStatus();

    return (
        <div className='flex-1 flex flex-col w-full'>
            <Banner
                data={trendingShows}
                title={'Search for any movie or tv show to discover streaming providers and more!'}
                renderSearchInput
                renderLogo
            />
            <div className='my-12 mx-auto'>
                <ShowCarousel data={trendingShows} dataLoading={loading} />
            </div>
            <Snackbar
                isOpen={!isOnline}
                isStatic
                severity='info'
                message='You appear to be offline. Please check your network connection to make the most of Streamability'
            />
        </div>
    );
};

export default FeaturedSearchScreen;
