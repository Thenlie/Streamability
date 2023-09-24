import React, { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import {
    getMovieDetails,
    getMovieRecommendations,
    formatReleaseDate,
    DateSize,
    getTvDetails,
    getTvRecommendations,
} from '../helpers';
import { ProfileArrayCols, ShowData } from '../types';
import { Providers, ShowCarousel, Rating, Button } from '../components';
import { Tooltip, Typography } from '@mui/material';
import { ShowDetailsLoader } from './loaders';
import { useIsInQueue, useIsInWatched, useIsInFavorites, useProfileContext } from '../hooks';
import {
    AddToQueue,
    Cancel,
    CheckCircle,
    Favorite,
    HeartBroken,
    RemoveFromQueue,
} from '@mui/icons-material';
import { addToProfileArray, removeFromProfileArray } from '../supabase/profiles';

const ProfileButtonSection: React.FC = (): JSX.Element | null => {
    const location: Location = useLocation();
    const id = parseInt(location.pathname.split('/')[3]);
    const showType = location.pathname.split('/')[2];
    const { profile, setProfile } = useProfileContext();
    const isInQueue = useIsInQueue(id);
    const isInFavorites = useIsInFavorites(id);
    const isInWatched = useIsInWatched(id);
    const [queueLoading, setQueueLoading] = useState(false);
    const [favoritesLoading, setFavoritesLoading] = useState(false);
    const [watchedLoading, setWatchedLoading] = useState(false);

    const handleLoading = (col: ProfileArrayCols, loading: boolean) => {
        switch (col) {
            case 'queue':
                setQueueLoading(loading);
                break;
            case 'favorites':
                setFavoritesLoading(loading);
                break;
            case 'watched':
                setWatchedLoading(loading);
                break;
        }
    };

    const clickHandler = async (col: ProfileArrayCols, type: 'add' | 'remove') => {
        if (!profile) return;
        handleLoading(col, true);
        if (type === 'add') {
            const res = await addToProfileArray(profile?.id, showType + '-' + id, col);
            if (!res) return;
            setProfile(res);
        } else {
            const res = await removeFromProfileArray(profile?.id, showType + '-' + id, col);
            if (!res) return;
            setProfile(res);
        }
        handleLoading(col, false);
    };

    if (!profile) return null;

    return (
        <div className='flex flex-col sm:flex-row items-center justify-center'>
            <Tooltip title={isInQueue ? 'Remove from Queue' : 'Add to Queue'}>
                <div>
                    <Button
                        title='Queue'
                        color={isInQueue ? 'error' : 'success'}
                        loading={queueLoading}
                        onClick={() => clickHandler('queue', isInQueue ? 'remove' : 'add')}
                        startIcon={isInQueue ? <RemoveFromQueue /> : <AddToQueue />}
                        sx={{ minWidth: 185 }}
                    />
                </div>
            </Tooltip>
            <Tooltip title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}>
                <div>
                    <Button
                        title='Favorite'
                        color={isInFavorites ? 'error' : 'success'}
                        loading={favoritesLoading}
                        onClick={() => clickHandler('favorites', isInFavorites ? 'remove' : 'add')}
                        startIcon={isInFavorites ? <HeartBroken /> : <Favorite />}
                        sx={{ minWidth: 185 }}
                    />
                </div>
            </Tooltip>
            <Tooltip title={isInWatched ? 'Remove from Watched' : 'Add to Watched'}>
                <div>
                    <Button
                        title='Watched'
                        color={isInWatched ? 'error' : 'success'}
                        loading={watchedLoading}
                        onClick={() => clickHandler('watched', isInWatched ? 'remove' : 'add')}
                        startIcon={isInWatched ? <Cancel /> : <CheckCircle />}
                        sx={{ minWidth: 185 }}
                    />
                </div>
            </Tooltip>
        </div>
    );
};

/**
 * Screen to show more details of a specific show
 * Rendered after user clicks on show card
 *
 * @returns {JSX.Element}
 */
const ShowDetailsScreen: React.FC = (): JSX.Element => {
    const location: Location = useLocation();
    const id = parseInt(location.pathname.split('/')[3]);
    const showType = location.pathname.split('/')[2];
    const [details, setDetails] = useState<ShowData>(
        location.state ? location.state.details : null
    );
    const [recommendations, setRecommendation] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fallbackText = 'Sorry, we could not find any recommendations based on this title.';

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            if (showType === 'movie') {
                const movieDetails = await getMovieDetails(id);
                setDetails(movieDetails);
                const recommendation = await getMovieRecommendations(id);
                if (recommendation) setRecommendation(recommendation);
            } else {
                const tvDetails = await getTvDetails(id);
                setDetails(tvDetails);
                const recommendation = await getTvRecommendations(id);
                if (recommendation) setRecommendation(recommendation);
            }
            setLoading(false);
        };
        handler();
    }, [location]);

    if (loading) {
        return <ShowDetailsLoader />;
    }

    // TODO: #438 Handle case when no details are ever returned
    if (!details) {
        return <p>No details found!</p>;
    }

    return (
        <>
            <section className='m-6 mb-8 flex flex-col lg:flex-row'>
                <div className='rounded-md m-3 w-[250px] lg:w-[300px] h-[400px] lg:h-[550px]'>
                    <img
                        className='w-[250px] lg:w-[300px] h-[400px] lg:h-[550px] max-w-none rounded-md'
                        src={
                            details.poster_path
                                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                                : '/poster-placeholder.jpeg'
                        }
                    ></img>
                </div>
                <div className='m-3 max-w-xl'>
                    <div>
                        <Typography
                            variant='h3'
                            align='left'
                            className='max-w-lg'
                            data-testid='show-details-heading'
                        >
                            {details.title}
                        </Typography>
                        {details.release_date && details.release_date.length === 10 && (
                            <Typography align='left' data-testid='details-release-date'>
                                {formatReleaseDate(details.release_date, DateSize.LONG)}
                            </Typography>
                        )}
                        <Typography align='left'>{details.age_rating}</Typography>
                        {details.runtime && (
                            <Typography align='left' variant='body2'>
                                {details.runtime} minutes
                            </Typography>
                        )}
                    </div>
                    <Rating
                        vote_average={details.vote_average || 0}
                        vote_count={details.vote_count || 0}
                    />
                    <div>
                        <Typography align='left' className='py-3'>
                            {details.overview}
                        </Typography>
                    </div>
                    <div className='bg-primary rounded-md my-3 p-2'>
                        <Providers id={details.id} showType={showType} />
                    </div>
                    <ProfileButtonSection />
                </div>
            </section>
            <section className='pb-6'>
                <ShowCarousel data={recommendations} fallbackText={fallbackText} />
            </section>
        </>
    );
};

export default ShowDetailsScreen;
