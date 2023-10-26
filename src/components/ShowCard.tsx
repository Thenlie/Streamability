import { Profile, ShowData } from '../types';
import { formatReleaseDate, DateSize } from '../helpers';
import { Typography as Typ } from '@mui/material';
import { useProfileActions } from '../hooks';
import React from 'react';
import ShowPoster from './ShowPoster';

export const SHOW_CARD_WIDTH = 360;

export interface ShowCardProps {
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
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
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
const ShowCard: React.FC<ShowCardProps> = ({ details, profile, setProfile }): JSX.Element => {
    const profileActions = useProfileActions(profile, setProfile);

    return (
        <div
            data-testid='show-card-component'
            className='m-3 flex flex-col w-[180px] bg-foreground rounded-sm'
        >
            <ShowPoster
                details={details}
                profile={profile}
                profileActions={profileActions}
                containerStyleOverride='!m-0 !rounded-none'
                imageStyleOverride='!rounded-b-none'
                showQueueButton={!!profile}
                showFavoritesButton={!!profile}
                showWatchedButton={!!profile}
            />
            <div className='flex flex-col justify-between p-2'>
                <div>
                    <Typ
                        variant='body1'
                        align='left'
                        sx={{
                            fontWeight: 'bold',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {details.title}
                    </Typ>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typ variant='body2' align='left'>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typ>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowCard;
