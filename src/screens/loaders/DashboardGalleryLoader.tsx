import React from 'react';
import { Button, ShowPosterLoader } from '../../components';
import { default as Typ } from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router';

interface DashboardGalleryLoaderProps {
    /**
     * The url path of the gallery being loaded
     */
    path: string;
}

/**
 * Displayed when the dashboard gallery is fetching users shows
 */
const DashboardGalleryLoader: React.FC<DashboardGalleryLoaderProps> = ({ path }) => {
    const navigate = useNavigate();

    return (
        <section className='m-4'>
            <Typ variant='h5' className='flex-1 p-4'>
                {path}
            </Typ>
            <Button
                title='Dashboard'
                StartIcon={ArrowBack}
                onClick={() => navigate('/dashboard')}
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6'>
                {[...Array(10)].map((x, i) => (
                    <ShowPosterLoader key={i} count={1} />
                ))}
            </div>
        </section>
    );
};

export default DashboardGalleryLoader;
