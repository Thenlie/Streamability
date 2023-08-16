import Carousel from 'nuka-carousel';
import { ShowData } from '../types/tmdb';
import { ShowCard } from '../components';
import { Profile } from '../types';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks';

interface ShowCarouselProps {
    /**
     * Array of ShowCards
     */
    data: ShowData[] | null;
    /**
     * Number of ShowCards to display in 1 step
     */
    size?: number;
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
function CarouselChildren({ data, profile, setProfile }: ShowCarouselProps): JSX.Element {
    return (
        <div className='flex justify-center'>
            {data?.map((item, i) => (
                <ShowCard
                    key={i}
                    details={item}
                    showType={item.showType}
                    profile={profile}
                    setProfile={setProfile}
                />
            ))}
        </div>
    );
}

/**
 * Show carousels will be used throughout the site to display collections of shows
 * The scroll horizontally and contain any number of show cards
 *
 * @returns {JSX.Element} | Carousel of movie cards
 */

// TODO: #458
export default function ShowCarousel({
    data,
    profile,
    setProfile,
}: ShowCarouselProps): JSX.Element {
    const windowSize = useWindowSize();
    const [carouselSteps, setCarouselSteps] = useState<number | null>(null);

    useEffect(() => {
        if (windowSize.width && windowSize.width > 1500) {
            setCarouselSteps(5);
        } else if (windowSize.width && windowSize.width > 900) {
            setCarouselSteps(3);
        } else {
            setCarouselSteps(1);
        }
    }, [windowSize]);

    const handleDataSlice = (data: ShowData[] | null) => {
        const arr = [];
        if (data && carouselSteps) {
            for (let i = 0; i < data.length; i += carouselSteps) {
                const chunk = data.slice(i, i + carouselSteps);
                arr.push(
                    <CarouselChildren
                        key={i}
                        data={chunk}
                        profile={profile}
                        setProfile={setProfile}
                    />
                );
            }
        }
        return arr;
    };

    return (
        <section className='pt-12'>
            <div className='w-[97vw]'>
                <Carousel wrapAround={true}>{handleDataSlice(data)}</Carousel>
            </div>
        </section>
    );
}
