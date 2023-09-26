import { ShowCard } from '../components';
import { useProfileContext, useTrendingShows } from '../hooks';
/**
 * Requests trending movies, passing data to ShowCard components.
 * @returns {JSX.Element}
 */
export default function DiscoverScreen(): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    const trendingShows = useTrendingShows('alpha');

    // TODO: #194 Make skeleton loading screen
    // if (loading) return <p>Loading...</p>;

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6'>
            {trendingShows?.map(
                (item, i) =>
                    item && (
                        <ShowCard
                            key={i}
                            details={item}
                            showType={item.media_type}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    )
            )}
        </div>
    );
}
