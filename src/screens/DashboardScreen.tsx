import React, { useState } from 'react';
import {
    useSessionContext,
    useProfileContext,
    useProfileActions,
    useGetProfileArray,
} from '../hooks';
import { deleteProfileById, clearProfileArray } from '../supabase/profiles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Typography as Typ } from '@mui/material';
import { Delete, Logout } from '@mui/icons-material';
import { ProfileArrayCols, ShowData } from '../types';
import { ConfirmDeleteModal, EditProfileModal, ShowCarousel, Button } from '../components';
import { SUPABASE } from '../helpers';

interface DashboardCarouselProps {
    data: ShowData[] | null;
    fallbackText: string;
    showPosterButtons?: {
        showQueueButton?: boolean;
        showFavoritesButton?: boolean;
        showWatchedButton?: boolean;
    };
    clearButtonTitle: string;
    loading: boolean;
    onClick: () => void;
}

/**
 * Carousels displayed on the Dashboard screen which will
 * contain a users queue, favorites and watched list.
 */
export const DashboardCarousel: React.FC<DashboardCarouselProps> = ({
    data,
    fallbackText,
    showPosterButtons,
    clearButtonTitle,
    loading,
    onClick,
}) => {
    const { profile, setProfile } = useProfileContext();
    const profileActions = useProfileActions(profile, setProfile);

    return (
        <div className='m-2'>
            <Typ variant='h6' align='left'>
                Watched Shows
            </Typ>
            <ShowCarousel
                data={data}
                fallbackText={fallbackText}
                profile={profile}
                profileActions={profileActions}
                showQueueButton={showPosterButtons?.showQueueButton || false}
                showFavoritesButton={showPosterButtons?.showFavoritesButton || false}
                showWatchedButton={showPosterButtons?.showWatchedButton || false}
            />
            <Button
                title={clearButtonTitle}
                color='error'
                disabled={!data || data.length === 0}
                loading={loading}
                StartIcon={Delete}
                onClick={onClick}
            />
        </div>
    );
};

/**
 * A logged in users profile screen. This is used to display
 * users personal information, queue, favorites and anything
 * else related directly to a user.
 */
const DashboardScreen: React.FC = () => {
    const { session, setSession } = useSessionContext();
    const { profile, setProfile } = useProfileContext();
    const queue = useGetProfileArray('queue');
    const favorites = useGetProfileArray('favorites');
    const watched = useGetProfileArray('watched');
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [clearQueueLoading, setClearQueueLoading] = useState(false);
    const [clearFavoritesLoading, setClearFavoritesLoading] = useState(false);
    const [clearWatchedLoading, setClearWatchedLoading] = useState(false);
    const navigate = useNavigate();

    const queueFallbackText =
        'Your queue is empty! Add shows to your watch queue to view them here.';
    const favoritesFallbackText =
        // eslint-disable-next-line prettier/prettier
        'You don\'t have any favorites! Favorite shows to view them here.';
    const watchedFallbackText =
        'Your watched list is empty! Add shows to your watched list to view them here.';

    // If the user is not logged in, redirect to login
    if (!session || !profile) {
        return <Navigate to={'/auth/login'} replace />;
    }

    /**
     * Delete profile row and auth entry.
     * We need to set the session to null here because
     * the util does not have access to the hook
     */
    const deleteProfile = async () => {
        setDeleteLoading(true);
        await deleteProfileById(session.user.id);
        setProfile(null);
        setSession(null);
        navigate('/');
    };

    /**
     * Remove all shows from the users watch queue.
     * Sets the loading flag before and after the operation.
     */
    const emptyProfileArray = async (whichCol: ProfileArrayCols) => {
        if (whichCol === 'queue') setClearQueueLoading(true);
        if (whichCol === 'favorites') setClearFavoritesLoading(true);
        if (whichCol === 'watched') setClearWatchedLoading(true);

        const res = await clearProfileArray(session.user.id, whichCol);
        if (res) setProfile(res);

        if (whichCol === 'queue') setClearQueueLoading(false);
        if (whichCol === 'favorites') setClearFavoritesLoading(false);
        if (whichCol === 'watched') setClearWatchedLoading(false);
    };

    /**
     * Logout current user.
     * When logged out, user is redirected to login page.
     */
    const handleLogout = async () => {
        setLogoutLoading(true);
        await SUPABASE.auth.signOut();
        setLogoutLoading(false);
    };

    return (
        <>
            <Typ variant='h5' m={2}>
                Welcome back {profile?.username}!
            </Typ>
            <section className='m-6 flex flex-col flex-1'>
                <div aria-live='polite' className='flex flex-col items-start justify-center m-2'>
                    <div className='text-left m-2'>
                        <Typ fontWeight='bold' display='inline'>
                            Email:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {session?.user.email}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Username:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.username}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Country of Origin:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.country}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            In Queue:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.queue?.length || 0}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Watched:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.watched?.length || 0}
                        </Typ>
                        <br />
                        <Typ fontWeight='bold' display='inline'>
                            Favorites:{' '}
                        </Typ>
                        <Typ align='left' display='inline'>
                            {profile?.favorites?.length || 0}
                        </Typ>
                    </div>

                    <EditProfileModal session={session} profile={profile} setProfile={setProfile} />

                    <Button
                        title='Logout'
                        loading={logoutLoading}
                        StartIcon={Logout}
                        onClick={handleLogout}
                    />
                    <ConfirmDeleteModal deleteProfile={deleteProfile} loading={deleteLoading} />
                </div>
                <DashboardCarousel
                    data={queue}
                    fallbackText={queueFallbackText}
                    showPosterButtons={{ showQueueButton: true }}
                    clearButtonTitle='Clear Queue'
                    loading={clearQueueLoading}
                    onClick={() => emptyProfileArray('queue')}
                />
                <DashboardCarousel
                    data={favorites}
                    fallbackText={favoritesFallbackText}
                    showPosterButtons={{ showFavoritesButton: true }}
                    clearButtonTitle='Clear Favorites'
                    loading={clearFavoritesLoading}
                    onClick={() => emptyProfileArray('favorites')}
                />
                <DashboardCarousel
                    data={watched}
                    fallbackText={watchedFallbackText}
                    showPosterButtons={{ showWatchedButton: true }}
                    clearButtonTitle='Clear Watched'
                    loading={clearWatchedLoading}
                    onClick={() => emptyProfileArray('watched')}
                />
            </section>
        </>
    );
};

export default DashboardScreen;
