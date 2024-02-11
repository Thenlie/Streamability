import { useState, useEffect } from 'react';
import { useTrendingShows } from '../../hooks';
import { ShowCarousel, Banner, OfflineSnackbar } from '../../components';
import { ShowData } from '../../types/tmdb';
import { useNavigate } from 'react-router-dom';
import {
    actionAdventureHandler,
    comedyHandler,
    highRatedHandler,
    horrorHandler,
    huluHandler,
    netflixHandler,
    newlyAddedHandler,
    primeHandler,
} from './discoverRequests';

/**
 * A non-login required screen which requests a variety
 * of filtered shows, rendering them within carousels
 */
const DiscoverScreen: React.FC = () => {
    const { trendingShows, loading } = useTrendingShows('alpha');
    const navigate = useNavigate();
    const [highestRated, setHighestRated] = useState<ShowData[] | null>(null);
    const [newlyAdded, setNewlyAdded] = useState<ShowData[] | null>(null);
    const [actionAdventure, setActionAdventure] = useState<ShowData[] | null>(null);
    const [comedy, setComedy] = useState<ShowData[] | null>(null);
    const [horror, setHorror] = useState<ShowData[] | null>(null);
    const [popularNetflix, setPopularNetflix] = useState<ShowData[] | null>(null);
    const [popularPrime, setPopularPrime] = useState<ShowData[] | null>(null);
    const [popularHulu, setPopularHulu] = useState<ShowData[] | null>(null);
    // Loading states
    const [highestRatedLoading, setHighestRatedLoading] = useState<boolean>(true);
    const [newlyAddedLoading, setNewlyAddedLoading] = useState<boolean>(true);
    const [actionAdventureLoading, setActionAdventureLoading] = useState<boolean>(true);
    const [comedyLoading, setComedyLoading] = useState<boolean>(true);
    const [horrorLoading, setHorrorLoading] = useState<boolean>(true);
    const [popularNetflixLoading, setPopularNetflixLoading] = useState<boolean>(true);
    const [popularPrimeLoading, setPopularPrimeLoading] = useState<boolean>(true);
    const [popularHuluLoading, setPopularHuluLoading] = useState<boolean>(true);

    useEffect(() => {
        highRatedHandler({ setState: setHighestRated, setLoading: setHighestRatedLoading });
        newlyAddedHandler({ setState: setNewlyAdded, setLoading: setNewlyAddedLoading });
        actionAdventureHandler({
            setState: setActionAdventure,
            setLoading: setActionAdventureLoading,
        });
        comedyHandler({ setState: setComedy, setLoading: setComedyLoading });
        horrorHandler({ setState: setHorror, setLoading: setHorrorLoading });
        netflixHandler({ setState: setPopularNetflix, setLoading: setPopularNetflixLoading });
        primeHandler({ setState: setPopularHulu, setLoading: setPopularHuluLoading });
        huluHandler({ setState: setPopularPrime, setLoading: setPopularPrimeLoading });
    }, []);

    // #851 Create global sections variable
    const sections = [
        {
            data: trendingShows,
            dataLoading: loading,
            title: 'Trending',
            path: 'trending',
        },
        {
            data: highestRated,
            dataLoading: highestRatedLoading,
            title: 'Highest Rated',
            path: 'best',
        },
        {
            data: newlyAdded,
            dataLoading: newlyAddedLoading,
            title: 'Newly Added',
            path: 'new',
        },
        {
            data: actionAdventure,
            dataLoading: actionAdventureLoading,
            title: 'Action & Adventure',
            path: 'action',
        },
        {
            data: comedy,
            dataLoading: comedyLoading,
            title: 'Comedy',
            path: 'comedy',
        },
        {
            data: horror,
            dataLoading: horrorLoading,
            title: 'Horror',
            path: 'horror',
        },
        {
            data: popularNetflix,
            dataLoading: popularNetflixLoading,
            title: 'Popular on Netflix',
            path: 'netflix',
        },
        {
            data: popularHulu,
            dataLoading: popularHuluLoading,
            title: 'Popular on Hulu',
            path: 'hulu',
        },
        {
            data: popularPrime,
            dataLoading: popularPrimeLoading,
            title: 'Popular on Prime',
            path: 'prime',
        },
    ];

    return (
        <div className='w-full' data-testid='discover-screen'>
            <Banner data={trendingShows} title={'Discover Our Popular Shows'} />
            {sections.map((section, i) => {
                return (
                    <div key={i}>
                        {i === 3 && <Banner data={actionAdventure} title='Genres' />}
                        {i === 6 && <Banner data={popularNetflix} title='Platforms' />}
                        <div className='my-6 flex flex-col items-center'>
                            <ShowCarousel
                                data={section.data}
                                dataLoading={section.dataLoading}
                                headerProps={{
                                    title: section.title,
                                    hasButton: true,
                                    buttonTitle: 'View More',
                                    onClick: () => navigate(`${section.path}`),
                                }}
                            />
                        </div>
                    </div>
                );
            })}
            <OfflineSnackbar />
        </div>
    );
};

export default DiscoverScreen;
