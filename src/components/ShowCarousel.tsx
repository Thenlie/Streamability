import Carousel from 'nuka-carousel';
import { ShowData } from '../types/tmdb';
import { ShowCard } from '../components';
import { Profile } from '../types';
import { useEffect, useState } from 'react';
import { useWindowSize } from '../hooks';
import useDebounce from '../hooks/useDebounceValue';

const SHOW_CARD_WIDTH = 390;

interface ShowCarouselProps {
    /**
     * Array of data to populate show cards
     */
    data: ShowData[] | null;
    /**
     * Number of ShowCards to display in 1 step.
     * If `undefined` this number will be based on screen size
     */
    size?: number | undefined;
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
export default function ShowCarousel({
    data,
    size,
    profile,
    setProfile,
}: ShowCarouselProps): JSX.Element {
    const windowSize = useWindowSize();
    const debouncedWindowSize = useDebounce(windowSize, 250);
    const [carouselSteps, setCarouselSteps] = useState<number>(size || 1);
    const [carouselWidth, setCarouselWidth] = useState<string>(
        (SHOW_CARD_WIDTH * (size || 1) + 100).toString() + 'px'
    );

    useEffect(() => {
        if (size) {
            setCarouselSteps(size);
            setCarouselWidth((SHOW_CARD_WIDTH * size + 100).toString() + 'px');
            return;
        }
        if (debouncedWindowSize.width && debouncedWindowSize.width > 1700) {
            setCarouselSteps(4);
            setCarouselWidth((SHOW_CARD_WIDTH * 4 + 100).toString() + 'px');
        } else if (debouncedWindowSize.width && debouncedWindowSize.width > 1500) {
            setCarouselSteps(3);
            setCarouselWidth((SHOW_CARD_WIDTH * 3 + 100).toString() + 'px');
        } else if (debouncedWindowSize.width && debouncedWindowSize.width > 1100) {
            setCarouselSteps(2);
            setCarouselWidth((SHOW_CARD_WIDTH * 2 + 100).toString() + 'px');
        } else {
            setCarouselSteps(1);
            setCarouselWidth((SHOW_CARD_WIDTH * 1 + 100).toString() + 'px');
        }
    }, [debouncedWindowSize, size]);

    const handleDataSlice = (data: ShowData[] | null) => {
        const arr = [];
        if (data) {
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
            <div className={`w-[${carouselWidth}]`}>
                <Carousel
                    wrapAround
                    className='bg-primary'
                    style={{
                        width: carouselWidth,
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        borderRadius: '5px',
                    }}
                    defaultControlsConfig={{
                        pagingDotsClassName: 'hidden',
                        nextButtonClassName: 'mr-3 rounded-sm',
                        prevButtonClassName: 'ml-3 rounded-sm',
                    }}
                >
                    {handleDataSlice(data)}
                </Carousel>
            </div>
        </section>
    );
}
