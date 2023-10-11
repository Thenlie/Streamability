import React from 'react';
import ShowCard, { ShowCardProps } from './ShowCard';
import ShowListCard, { ShowListCardProps } from './ShowListCard';
import { Profile, ShowData } from '../types';

interface SearchResultCardsProps {
    details: ShowData[] | null;
    viewState: 'grid' | 'list';
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
 * Loops over show details and creates an array of show cards
 * using the correct component based on the `viewState`
 */
const SearchResultCards: React.FC<SearchResultCardsProps> = ({
    details,
    viewState,
    profile,
    setProfile,
}) => {
    const CardComp: React.FC<ShowCardProps | ShowListCardProps> = (props) => {
        return viewState === 'grid' ? <ShowCard {...props} /> : <ShowListCard {...props} />;
    };

    return (
        <div
            className={`${
                viewState === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'flex flex-wrap justify-center'
            } pb-6
            `}
        >
            {details?.map((item, i) => {
                return (
                    <CardComp
                        key={i}
                        details={item}
                        showType={item.media_type}
                        profile={profile}
                        setProfile={setProfile}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(SearchResultCards);
