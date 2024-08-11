import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { ProfileArrayCols } from '../../types';
import {
    useGetProfileArray,
    useProfileActions,
    useProfileContext,
    useSessionContext,
} from '../../hooks';
import { Button, ShowPoster } from '../../components';
import { DashboardGalleryLoader } from '../loaders';
import Typ from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import DashboardEmptyGallery from './DashboardEmptyGallery';

export async function loader({ request }: { request: Request }): Promise<string> {
    // get the end of the path from the URL
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop();
    if (!path) {
        throw new Response('Bad Request', { status: 400 });
    }
    return path as ProfileArrayCols;
}

const DashboardGalleryScreen: React.FC = () => {
    const { profile, setProfile } = useProfileContext();
    const { session } = useSessionContext();
    const profileActions = useProfileActions(profile, setProfile);
    const navigate = useNavigate();
    const path: ProfileArrayCols = useLoaderData() as ProfileArrayCols;
    const { data, loading } = useGetProfileArray(path);

    // If the user is not logged in, redirect to login
    if (!session) {
        return <Navigate to={'/login'} replace />;
    }

    // TODO: If profile does not return after a few seconds,
    // we should assume the user is not logged in and redirect to an auth page
    if (!profile || loading) return <DashboardGalleryLoader path={path} />;

    /**
     * Return the page title based on the URL path
     */
    const getTitle = (path: ProfileArrayCols): string => {
        switch (path) {
            case 'queue':
                return 'watch queue';
            case 'favorites':
                return 'favorites';
            case 'watched':
                return 'watched list';
        }
    };

    return (
        <div className='m-4' data-testid='dashboard-gallery-screen'>
            <Typ variant='h5' sx={{ padding: 2 }}>{`${profile.username}'s ${getTitle(path)}`}</Typ>
            <Button
                title='Dashboard'
                StartIcon={ArrowBack}
                onClick={() => navigate('/dashboard')}
            />
            {data && data.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6'>
                    {data.map((item, i) => (
                        <ShowPoster
                            key={i}
                            details={item}
                            profile={profile}
                            profileActions={profileActions}
                            showQueueButton={path === 'queue'}
                            showFavoritesButton={path === 'favorites'}
                            showWatchedButton={path === 'watched'}
                        />
                    ))}
                </div>
            ) : (
                <DashboardEmptyGallery title={getTitle(path)} />
            )}
        </div>
    );
};

export default DashboardGalleryScreen;
