import { addToProfileWatchQueue, removeFromProfileWatchQueue } from '../supabase/profiles';
import { Profile, ShowData } from '../types';
import { Link } from 'react-router-dom';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { Button, CardActions, CardMedia, Rating, Typography } from '@mui/material';
import { pluralizeString } from '../helpers/stringFormatUtils';
import { useIsInWatchQueue } from '../hooks';

export interface ShowListCardProps {
    /**
     * Movie or TV show metadata
     */
    details: ShowData;
    /**
     * Either 'movie' or 'tv'
     */
    showType: string;
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
 * A horizontal show card that allows for a description and
 * longer titles to be displayed. When the image is clicked,
 * the user is navigated to the `ShowDetailsPage`.
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
export default function ShowListCard({
    details,
    showType,
    profile,
    setProfile,
}: ShowListCardProps): JSX.Element {
    const isInWatchQueue = useIsInWatchQueue(details.id, profile);

    /**
     * Handle card being added to or removed from
     * a users watch queue
     *
     * @param isPush | true if adding, false if removing
     * @param show_id | movie db id being updated
     */
    const queueHandler = async (isPush: boolean, show_id: number | undefined) => {
        if (show_id) {
            if (isPush && profile) {
                const data = await addToProfileWatchQueue(
                    profile.id,
                    `${details.showType}-${show_id}`
                );
                setProfile(data);
            } else if (profile) {
                const data = await removeFromProfileWatchQueue(
                    profile.id,
                    `${details.showType}-${show_id}`
                );
                setProfile(data);
            }
        }
    };

    return (
        <div
            data-testid='show-list-card-component'
            className='items-left m-1 flex w-[700px] rounded-md bg-foreground border-[1px] border-gray-300 shadow-md'
        >
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-l-md'
                    sx={{ width: 100, minWidth: 100, height: 180, minHeight: 180 }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={`${details.title} poster`}
                />
            </Link>
            <div className='p-2 flex flex-col justify-between'>
                <div>
                    <Typography variant='h5' align='left' paddingLeft={1} noWrap width={500}>
                        {details.title}
                    </Typography>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typography align='left' style={{ opacity: 0.8 }} paddingLeft={1} noWrap>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typography>
                    )}
                    <Typography
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
                    </Typography>
                </div>
                <div className='flex justify-between'>
                    <div style={{ textAlign: 'left', alignSelf: 'end' }}>
                        <Rating
                            name='half-rating'
                            defaultValue={details.vote_average ? details.vote_average / 2 : 0}
                            precision={0.5}
                            style={{ paddingLeft: 4 }}
                            readOnly
                        />
                        <Typography variant='body2' align='left' paddingLeft={1}>
                            {details.vote_average && details.vote_count
                                ? details.vote_count +
                                  ' ' +
                                  pluralizeString(details.vote_count, 'rating')
                                : 'No Ratings available'}
                        </Typography>
                    </div>
                    {profile && (
                        <CardActions
                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
                        >
                            <Button
                                sx={{ m: 1, pl: 1 }}
                                variant='contained'
                                size='small'
                                color='secondary'
                                onClick={() => queueHandler(!isInWatchQueue, details?.id)}
                            >
                                {isInWatchQueue ? 'Remove from queue' : 'Add to queue'}
                            </Button>
                        </CardActions>
                    )}
                </div>
            </div>
        </div>
    );
}
