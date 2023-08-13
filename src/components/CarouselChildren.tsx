import { ShowData } from '../types/tmdb';
import { ShowCard } from '../components';
import { Profile } from '../types';

interface CarouselChildrenProps {
    /**
     * Array of ShowCards
     */
    data: ShowData[] | null;
    /**
     * User profile if logged in, otherwise `null`
     */
    profile: Profile | null;
    /**
     * Profile setting function that accepts a `Profile` or `null`
     */
    setProfile: (profile: Profile | null) => void;
}

/**
 * Carousel component will utilize CarouselChildren to display nth ShowCards per carousel step.
 *
 * @returns {JSX.Element} | Collection of ShowCards
 */
export default function CarouselChildren({
    data,
    profile,
    setProfile,
}: CarouselChildrenProps): JSX.Element {
    return (
        <div className='flex'>
            {data?.map((item, i) => (
                <ShowCard
                    key={i}
                    details={item}
                    showType='movie'
                    profile={profile}
                    setProfile={setProfile}
                />
            ))}
        </div>
    );
}
