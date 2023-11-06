import React from 'react';
import ShowCard, { ShowCardProps } from '../../components/ShowCard';
import ShowListCard, { ShowListCardProps } from '../../components/ShowListCard';
import { Profile, ShowData } from '../../types';

interface SearchResultsCardsProps {
    details: ShowData[] | null;
    viewState: 'grid' | 'list';
    /**
     * User profile if logged in, otherwise `null`
     */
    profile: Profile | null;
    /**
     * Profile setting function that accepts a `Profile` or `null`
     */
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

/**
 * Loops over show details and creates an array of show cards
 * using the correct component based on the `viewState`
 */
const SearchResultsCards: React.FC<SearchResultsCardsProps> = ({
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
            }
            `}
        >
            {details?.map((item, i) => {
                return (
                    <CardComp key={i} details={item} profile={profile} setProfile={setProfile} />
                );
            })}
        </div>
    );
};

export default SearchResultsCards;
