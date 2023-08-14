import Carousel from 'nuka-carousel';
import { ShowData } from '../types/tmdb';
import { CarouselChildren } from '../components';
import { Profile } from '../types';

interface ShowCarouselProps {
    /**
     * Array of ShowCards
     */
    data: ShowData[] | null;
    /**
     * Number of ShowCards to display in 1 step
     */
    size: number;
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
 * Show carousels will be used throughout the site to display collections of shows
 * The scroll horizontally and contain any number of show cards
 *
 * @returns {JSX.Element} | Carousel of movie cards
 */
export default function ShowCarousel({
    data,
    size,
    profile,
    setProfile,
}: ShowCarouselProps): JSX.Element {
    const handleDataSlice = (data: ShowData[] | null) => {
        const arr = [];
        if (data) {
            for (let i = 0; i < data.length; i += size) {
                const chunk = data.slice(i, i + size);
                arr.push(
                    <CarouselChildren data={chunk} profile={profile} setProfile={setProfile} />
                );
            }
        }
        return arr;
    };

    return (
        <div className='w-screen '>
            <Carousel>{handleDataSlice(data)}</Carousel>
        </div>
    );
}
