import Typ from '@mui/material/Typography';

interface DashboardEmptyGalleryProps {
    title: string;
}

/**
 * Returned on the dashboard gallery screen when there are no shows
 * in the given profile array
 */
const DashboardEmptyGallery: React.FC<DashboardEmptyGalleryProps> = ({ title }) => {
    return (
        <div className='m-6'>
            <div className='flex justify-center w-full'>
                <img src='/images/resting.svg' width={500} alt='Resting Image'></img>
            </div>
            <Typ variant='h5' sx={{ marginTop: 4 }}>{`Your ${title} is empty!`}</Typ>
            <Typ variant='body1'>{`Add shows to you ${title} to view them here.`}</Typ>
        </div>
    );
};

export default DashboardEmptyGallery;
