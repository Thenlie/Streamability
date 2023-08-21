import { addToProfileWatchQueue, removeFromProfileWatchQueue } from '../supabase/profiles';
import { Profile, ShowData } from '../types';
import { Link } from 'react-router-dom';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { Button, CardActions, CardMedia, Typography } from '@mui/material';
import Rating from './Rating';
import { useIsInWatchQueue } from '../hooks';

export interface ShowCardProps {
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
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard({
    details,
    showType,
    profile,
    setProfile,
}: ShowCardProps): JSX.Element {
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
        <div data-testid='show-card-component' className='m-1 flex w-96 bg-foreground rounded-sm'>
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                <CardMedia
                    component='img'
                    className='w-full cursor-pointer rounded-l-sm'
                    sx={{ width: 180, minWidth: 180, height: 270, minHeight: 270 }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={`${details.title} poster`}
                />
            </Link>
            <div className='flex flex-col justify-between py-1 pl-2'>
                <div>
                    <Typography
                        variant='h5'
                        align='left'
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {details.title}
                    </Typography>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typography align='left'>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typography>
                    )}
                </div>
                <div>
                    <Rating
                        vote_average={details.vote_average || 0}
                        vote_count={details.vote_count || 0}
                    />
                    {profile && (
                        <CardActions
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                padding: 0,
                            }}
                        >
                            <Button
                                sx={{ m: 1, fontSize: 12 }}
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
