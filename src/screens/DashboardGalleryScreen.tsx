import { useLoaderData } from 'react-router-dom';
import { ProfileArrayCols } from '../types';

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
    const path: string = useLoaderData() as ProfileArrayCols;

    return <p>{path}</p>;
};

export default DashboardGalleryScreen;
