import React, { useEffect, useState } from 'react';
import { Link, Location, useLocation } from 'react-router';
import {
    getMovieDetails,
    getMovieRecommendations,
    getTvDetails,
    getTvRecommendations,
    getReleaseDate,
    getRuntime,
    validateSeasons,
} from '../helpers';
import { useProfileContext, useIsInProfileArray, useProfileActions } from '../hooks';
import { ShowData } from '../types';
import {
    Providers,
    ShowCarousel,
    Rating,
    Button,
    OfflineSnackbar,
    ActorCard,
    SeasonCard,
} from '../components';
import { ShowDetailsLoader } from './loaders';
import EmptyShowDetailsScreen from './EmptyShowDetailsScreen';
import { Tooltip, Typography as Typ } from '@mui/material';
import {
    AddToQueue,
    Cancel,
    CheckCircle,
    Favorite,
    HeartBroken,
    PersonAddAltRounded,
    RemoveFromQueue,
} from '@mui/icons-material';

/**
 * Buttons to alter the show in a logged in users profile.
 * Will not render when not logged in.
 */
const ProfileButtonSection: React.FC<{ showId: number; showType: string }> = ({
    showId,
    showType,
}) => {
    const dbShowId = showType + '-' + showId;
    const { profile, setProfile } = useProfileContext();
    const { isInQueue, isInFavorites, isInWatched } = useIsInProfileArray(showId, profile);
    const profileActions = useProfileActions(profile, setProfile);

    // If user is not logged in, display a sign up CTA
    if (!profile || !profileActions) {
        return (
            <div className='flex items-center justify-center'>
                <Link to='/signup'>
                    <Button
                        title='Sign up to save shows!'
                        color='secondary'
                        StartIcon={PersonAddAltRounded}
                        sx={{ width: 300 }}
                    />
                </Link>
            </div>
        );
    }

    const {
        removeFromQueue,
        addToQueue,
        removeFromFavorites,
        addToFavorites,
        removeFromWatched,
        addToWatched,
        queueLoading,
        favoritesLoading,
        watchedLoading,
    } = profileActions;

    return (
        <div className='flex flex-col sm:flex-row items-center justify-center'>
            <Tooltip title={isInQueue ? 'Remove from Queue' : 'Add to Queue'}>
                <div>
                    <Button
                        title='Queue'
                        color={isInQueue ? 'error' : 'success'}
                        loading={queueLoading}
                        onClick={() =>
                            isInQueue ? removeFromQueue(dbShowId) : addToQueue(dbShowId)
                        }
                        StartIcon={isInQueue ? RemoveFromQueue : AddToQueue}
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
                        onClick={() =>
                            isInFavorites ? removeFromFavorites(dbShowId) : addToFavorites(dbShowId)
                        }
                        StartIcon={isInFavorites ? HeartBroken : Favorite}
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
                        onClick={() =>
                            isInWatched ? removeFromWatched(dbShowId) : addToWatched(dbShowId)
                        }
                        StartIcon={isInWatched ? Cancel : CheckCircle}
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
 */
const ShowDetailsScreen: React.FC = () => {
    const location: Location = useLocation();
    const showId = parseInt(location.pathname.split('/')[3]);
    const showType = location.pathname.split('/')[2];
    const { profile } = useProfileContext();
    const [details, setDetails] = useState<ShowData>(
        location.state ? location.state.details : null
    );
    const [recommendations, setRecommendation] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);

    const carouselFallbackText =
        'Sorry, we could not find any recommendations based on this title.';

    useEffect(() => {
        const handler = async () => {
            if (showType === 'movie') {
                const movieDetails = await getMovieDetails(showId);
                setDetails(movieDetails);
                const recommendation = await getMovieRecommendations(showId);
                setRecommendation(recommendation);
            } else {
                const tvDetails = await getTvDetails(showId);
                setDetails(tvDetails);
                const recommendation = await getTvRecommendations(showId);
                setRecommendation(recommendation);
            }
            setLoading(false);
        };
        handler();
    }, [location]);

    if (loading) {
        return <ShowDetailsLoader />;
    }

    if (!details) {
        return <EmptyShowDetailsScreen />;
    }

    return (
        <>
            <section
                className='m-6 mb-8 flex flex-col lg:flex-row'
                data-testid='show-details-screen'
            >
                <div className='rounded-md m-3 w-[250px] lg:w-[330px]'>
                    <img
                        className='w-[250px] lg:w-[330px] max-w-none rounded-md'
                        style={{ aspectRatio: 2 / 3 }}
                        src={
                            details.poster_path
                                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                                : '/poster-placeholder.jpeg'
                        }
                        alt={`${details.title} poster`}
                    ></img>
                </div>
                <div className='m-3 max-w-xl'>
                    <div>
                        <Typ variant='h3' align='left' className='max-w-lg'>
                            {details.title}
                        </Typ>
                        <Typ align='left'>{getReleaseDate(details)}</Typ>
                        <Typ align='left' variant='body2'>
                            {getRuntime(details)}
                        </Typ>
                        <Typ align='left'>{details.age_rating}</Typ>
                    </div>
                    <Rating
                        vote_average={details.vote_average || 0}
                        vote_count={details.vote_count || 0}
                    />
                    <div>
                        <Typ align='left' className='py-3'>
                            {details.overview}
                        </Typ>
                    </div>
                    <div className='bg-foreground rounded-md my-3 p-2'>
                        <Providers id={details.id} showType={showType} />
                    </div>
                    <ProfileButtonSection showId={showId} showType={showType} />
                </div>
            </section>
            {details.credits && details.credits.cast.length > 0 && (
                <section className='max-w-full px-6 md:px-12 mx-auto'>
                    <Typ variant='h5'>Cast</Typ>
                    <div className='flex flex-nowrap overflow-x-auto w-full'>
                        {details.credits.cast.map((actor, i) => {
                            return <ActorCard key={i} details={actor} />;
                        })}
                    </div>
                </section>
            )}
            {details.credits && details.credits.crew.length > 0 && (
                <section className='max-w-full px-6 md:px-12 mt-3 mx-auto'>
                    <Typ variant='h5'>Crew</Typ>
                    <div className='flex flex-nowrap overflow-x-auto w-full'>
                        {details.credits.crew.map((actor, i) => {
                            return <ActorCard key={i} details={actor} isCrew={true} />;
                        })}
                    </div>
                </section>
            )}
            {details.seasons && (
                <section className='flex flex-col items-center sm:items-start my-6 w-[65svw] max-w-[1090px]'>
                    <Typ className='sm:px-1' variant='h5'>
                        Last Season
                    </Typ>
                    <SeasonCard details={validateSeasons(details.seasons).slice(-1)[0]} />
                    <Link
                        className='sm:px-1 mt-3 hover:text-blue-500 cursor-pointer'
                        to={'seasons'}
                        state={{ details: details }}
                    >
                        View All Seasons
                    </Link>
                </section>
            )}
            <section className='my-8'>
                <ShowCarousel
                    data={recommendations}
                    fallbackText={carouselFallbackText}
                    profile={profile}
                    headerProps={{ title: 'Recommendations' }}
                />
            </section>
            <OfflineSnackbar />
        </>
    );
};

export default ShowDetailsScreen;
