import { addToProfileArray, removeFromProfileArray } from '../supabase/profiles';
import { Profile, ShowData } from '../types';
import { Link, useNavigate } from 'react-router';
import { formatReleaseDate, DateSize } from '../helpers';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typ from '@mui/material/Typography';
import { useIsInProfileArray } from '../hooks';
import React from 'react';
import Button from './Button';
import AddToQueue from '@mui/icons-material/AddToQueue';
import RemoveFromQueue from '@mui/icons-material/RemoveFromQueue';
import Rating from './Rating';

export interface ShowListCardProps {
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
 * A horizontal show card that allows for a description and
 * longer titles to be displayed. When the image is clicked,
 * the user is navigated to the `ShowDetailsPage`.
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {React.JSX.Element} | Single show card
 */
const ShowListCard: React.FC<ShowListCardProps> = ({
    details,
    profile,
    setProfile,
}): React.JSX.Element => {
    const { isInQueue } = useIsInProfileArray(details.id, profile);
    const navigate = useNavigate();

    /**
     * Handle card being added to or removed from
     * a users queue, watched, or favorites
     *
     * @param isPush | true if adding, false if removing
     * @param show_id | movie db id being updated
     */
    const queueHandler = async (isPush: boolean, show_id: number | undefined) => {
        if (show_id) {
            if (isPush && profile) {
                const data = await addToProfileArray(
                    profile.id,
                    `${details.media_type}-${show_id}`,
                    'queue'
                );
                setProfile(data);
            } else if (profile) {
                const data = await removeFromProfileArray(
                    profile.id,
                    `${details.media_type}-${show_id}`,
                    'queue'
                );
                setProfile(data);
            }
        }
    };

    return (
        <div
            data-testid='show-list-card-component'
            className='items-left m-1 flex w-[700px] rounded-md bg-foreground shadow-md'
        >
            <Link to={`/details/${details.media_type}/${details.id}`} state={details}>
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-l-md'
                    sx={{ width: 115, minWidth: 115, height: 180, minHeight: 180 }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={`${details.title} poster`}
                />
            </Link>
            <div className='p-2 flex flex-col justify-between flex-1'>
                <div>
                    <Typ
                        className='hover:text-blue-500 cursor-pointer'
                        variant='h5'
                        align='left'
                        paddingLeft={1}
                        noWrap
                        width={500}
                        onClick={() => navigate(`/details/${details.media_type}/${details.id}`)}
                    >
                        {details.title}
                    </Typ>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typ align='left' style={{ opacity: 0.8 }} paddingLeft={1} noWrap>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typ>
                    )}
                    <Typ
                        align='left'
                        paddingLeft={1}
                        fontSize={14}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {details.overview}
                    </Typ>
                </div>
                <div className='flex justify-between'>
                    <div style={{ textAlign: 'left', alignSelf: 'end' }}>
                        <Rating
                            vote_average={details.vote_average}
                            vote_count={details.vote_count}
                        />
                    </div>
                    {profile && (
                        <CardActions
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                        >
                            <Button
                                color={isInQueue ? 'error' : 'success'}
                                StartIcon={isInQueue ? RemoveFromQueue : AddToQueue}
                                onClick={() => queueHandler(!isInQueue, details?.id)}
                                title={isInQueue ? 'Remove from queue' : 'Add to queue'}
                                sx={{ margin: 0, pl: 1, minHeight: 35, height: 35, width: 250 }}
                            />
                        </CardActions>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowListCard;
