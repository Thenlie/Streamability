import { useProfileContext } from '../hooks';
import {
    addToProfileWatchQueue,
    getProfileWatchQueue,
    removeFromProfileWatchQueue,
} from '../supabase/profiles';
import { ShowData } from '../types';
import { Link } from 'react-router-dom';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { useEffect, useState } from 'react';
import { Button, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';

interface MovieCardProps {
    details: ShowData;
    showType: string;
}

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 *
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard({ details, showType }: MovieCardProps): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    const [isInWatchQueue, setIsInWatchQueue] = useState<boolean>(false);

    /**
     * On component render, get the current users watch queue from Supabase
     * Check if it contains the current shows ID and set the boolean accordingly
     */
    useEffect(() => {
        const handler = async () => {
            const currentWatchQueue = profile ? await getProfileWatchQueue(profile.id) : null;
            if (currentWatchQueue && details.id && currentWatchQueue.includes(details.id)) {
                setIsInWatchQueue(true);
            }
        };
        handler();
    }, []);

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
                const data = await addToProfileWatchQueue(profile.id, show_id);
                setProfile(data);
                setIsInWatchQueue(true);
            } else if (profile) {
                const data = await removeFromProfileWatchQueue(profile.id, show_id);
                setProfile(data);
                setIsInWatchQueue(false);
            }
        }
    };

    return (
        <div data-testid='show-card-component' className='m-1 flex w-96 bg-foreground'>
            <Link
                to={`/details/${showType}/${details.id}`}
                state={details}
                data-testid='show-details-link'
            >
                {details.poster_path ? (
                    <CardMedia
                        component='img'
                        className='w-full cursor-pointer'
                        sx={{ width: 180, minWidth: 180, height: 270, minHeight: 270 }}
                        image={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        alt={`${details.title} poster`}
                    />
                ) : (
                    <CardMedia
                        component='img'
                        className='w-full cursor-pointer'
                        sx={{ width: 180, minWidth: 180, height: 270, minHeight: 270 }}
                        image={'/poster-placeholder.jpeg'}
                        alt={`${details.title} poster`}
                    />
                )}
            </Link>
            <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
                <CardContent>
                    <Typography variant='h5'>{details.title}</Typography>
                    {details.release_date && details.release_date.length === 10 && (
                        <Typography>
                            {formatReleaseDate(details.release_date, DateSize.MEDIUM)}
                        </Typography>
                    )}
                    {details.vote_average ? (
                        <div>
                            <Rating
                                name='half-rating'
                                defaultValue={details.vote_average / 2}
                                precision={0.5}
                                readOnly
                            />
                            <Typography variant='body2'>{details.vote_count} ratings</Typography>
                        </div>
                    ) : (
                        <Typography variant='body2'>No ratings available</Typography>
                    )}
                </CardContent>
                {profile && (
                    <CardActions sx={{ margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                        {isInWatchQueue ? (
                            <Button
                                sx={{ m: 1 }}
                                variant='outlined'
                                size='small'
                                color='secondary'
                                onClick={() => queueHandler(true, details?.id)}
                            >
                                Add to queue
                            </Button>
                        ) : (
                            <Button
                                sx={{ m: 1 }}
                                variant='outlined'
                                size='small'
                                color='secondary'
                                onClick={() => queueHandler(false, details?.id)}
                            >
                                Remove from queue
                            </Button>
                        )}
                    </CardActions>
                )}
            </Box>
        </div>
    );
}
