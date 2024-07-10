import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { Typography as Typ } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

/**
 * Returned when the show details endpoint is hit but the
 * TMDB details query does not return anything.
 */
const EmptyShowDetailsScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='m-6 flex flex-col items-center' data-testid='empty-show-details-screen'>
            <img src='/images/error.svg' width={500} />
            <Typ variant='h5' margin={2}>
                We couldn&apos;t find any more details for this show. Sorry about that!
            </Typ>
            <Typ>
                Something may have gone wrong on our end, or there may simply not be detailed
                information about this show.
            </Typ>
            <Button
                title='Go Back'
                StartIcon={ArrowBack}
                onClick={() => navigate(-1)}
                sx={{ width: 200, marginY: 4 }}
            />
        </div>
    );
};

export default EmptyShowDetailsScreen;
