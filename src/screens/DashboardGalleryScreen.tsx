import { useLoaderData } from 'react-router-dom';
import { ProfileArrayCols } from '../types';
import { useGetProfileArray, useProfileActions, useProfileContext } from '../hooks';
import { ShowPoster } from '../components';
import { ShowDetailsLoader } from './loaders';
import { Typography as Typ } from '@mui/material';

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
    const path: ProfileArrayCols = useLoaderData() as ProfileArrayCols;
    const data = useGetProfileArray(path);

    // TODO: Create new loader
    if (!profile) return <ShowDetailsLoader />;

    return (
        <div className='m-4'>
            <Typ variant='h5'>
                {profile.username}&apos;s {path}{' '}
            </Typ>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6'>
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
