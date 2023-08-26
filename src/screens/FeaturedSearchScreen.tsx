import { useState, useEffect } from 'react';
import { ShowCarousel, ShowCarouselPlaceholder, SearchInput } from '../components';
import type { ShowData } from '../types';
import { getMovieTrending, getTvTrending } from '../helpers';

/**
 * This is currently just a minimal sample file to get the directory structure of the project set up
 * The contents of this page and its components should be updated, along with this comment :)
 *
 * @returns {JSX.Element} | 'not logged in' search screen, the landing page of the app
 */
export default function FeaturedSearchScreen(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(true);
    const [trendingShows, setTrendingShows] = useState<ShowData[] | null>(null);

    useEffect(() => {
        const handler = async () => {
            const movieData: ShowData[] | null = await getMovieTrending();
            const tvData: ShowData[] | null = await getTvTrending();
            if (movieData && tvData) {
                setTrendingShows([...movieData, ...tvData]);
            }
            setLoading(false);
        };
        handler();
    }, []);
    return (
        <div className='mt-6 flex-1 flex flex-col justify-center'>
            <h1 data-testid='featured-search-heading'>Featured Search Page</h1>
            <SearchInput />

            {loading ? (
                <ShowCarouselPlaceholder count={4} />
            ) : (
                <ShowCarousel data={trendingShows} />
            )}
        </div>
    );
}
