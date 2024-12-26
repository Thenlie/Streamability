import React from 'react';
import { ShowCarousel, Banner, OfflineSnackbar } from '../components';
import { useTrendingShows, useInTheatresShows } from '../hooks';

/**
 * The landing page of the application which shows a show banner,
 * a search input, and trending shows in a carousel.
 */
const FeaturedSearchScreen: React.FC = () => {
    const { trendingShows, loading } = useTrendingShows('release');
    const { inTheatresShows } = useInTheatresShows();

    return (
        <div className='flex-1 flex flex-col w-full' data-testid='featured-search-screen'>
            <Banner
                data={trendingShows}
                dataLoading={loading}
                title={'Search for any movie or tv show to discover streaming providers and more!'}
                renderSearchInput
                renderLogo
            />
            <div className='my-12 mx-auto'>
                <ShowCarousel
                    data={trendingShows}
                    dataLoading={loading}
                    headerProps={{ title: 'Trending Shows' }}
                />
            </div>
            <div className='my-12 mx-auto'>
                <ShowCarousel
                    data={inTheatresShows}
                    dataLoading={loading}
                    headerProps={{ title: 'In theatres' }}
                />
            </div>
            <OfflineSnackbar />
        </div>
    );
};

export default FeaturedSearchScreen;
