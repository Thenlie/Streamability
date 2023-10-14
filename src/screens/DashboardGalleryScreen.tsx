import { useLoaderData, useNavigate } from 'react-router-dom';
import { ProfileArrayCols } from '../types';
import { useGetProfileArray, useProfileActions, useProfileContext } from '../hooks';
import { Button, ShowPoster } from '../components';
import { DashboardGalleryLoader } from './loaders';
import { Typography as Typ } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

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
    const profileActions = useProfileActions(profile, setProfile);
    const navigate = useNavigate();
    const path: ProfileArrayCols = useLoaderData() as ProfileArrayCols;
    const data = useGetProfileArray(path);

    // TODO: If profile does not return after a few seconds,
    // we should assume the user is not logged in and redirect to an auth page
    if (!profile) return <DashboardGalleryLoader />;

    return (
        <div className='m-4'>
            <Typ variant='h5' className='flex-1'>
                {profile.username}&apos;s {path}{' '}
            </Typ>
            <Button
                title='Dashboard'
                StartIcon={ArrowBack}
                onClick={() => navigate('/dashboard')}
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6'>
                {data?.map(
                    (item, i) =>
                        item && (
                            <ShowPoster
                                key={i}
                                details={item}
                                profile={profile}
                                profileActions={profileActions}
                                showQueueButton={path === 'queue'}
                                showFavoritesButton={path === 'favorites'}
                                showWatchedButton={path === 'watched'}
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default DashboardGalleryScreen;
