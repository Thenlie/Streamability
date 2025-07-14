import { useEffect, useState } from 'react';
import { useLocation, Location, Link } from 'react-router';
import { ShowData } from '../types';
import { getTvDetails } from '../helpers';
import { SeasonCard, SeasonCardLoader } from '../components';
import Typ from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

/**
 * Screen to render all of a TV Show's Seasons
 */
const SeasonsScreen: React.FC = (): React.JSX.Element => {
    const location: Location = useLocation();
    const showId = parseInt(location.pathname.split('/')[3]);
    const [details, setDetails] = useState<ShowData>(
        location.state ? location.state.details : null
    );
    const [loading, setLoading] = useState(details ? false : true);

    useEffect(() => {
        const handler = async () => {
            const tvDetails = await getTvDetails(showId);
            setDetails(tvDetails);
            setLoading(false);
        };
        if (!details) handler();
    }, [location]);

    if (loading) {
        return <SeasonCardLoader count={5} />;
    }

    return (
        <section
            data-testid='seasons-screen'
            className='m-6 flex items-center sm:items-start flex-col w-[70svw] max-w-[1380px]'
        >
            <div className='mb-3 flex flex-col sm:flex-row items-center'>
                <CardMedia
                    component='img'
                    className='rounded-xs'
                    sx={{
                        boxShadow: 5,
                        width: 58,
                        height: 87,
                    }}
                    image={
                        details.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={details.title + ' poster'}
                />
                <div className='flex flex-col sm:items-start'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <Typ className='sm:pl-2' fontWeight={'bold'} variant='h4'>
                            {details.title}
                        </Typ>
                        <Typ className='sm:pl-2'>
                            {'(' + details.release_date?.slice(0, 4) + ')'}
                        </Typ>
                    </div>
                    <Link
                        className='sm:pl-2 hover:text-blue-500 cursor-pointer'
                        to={`/details/tv/${details.id}`}
                        state={{ details: details }}
                    >
                        <ArrowBackRoundedIcon />
                        Back to Show Details
                    </Link>
                </div>
            </div>

            {details.seasons?.map((item, i) => (
                <SeasonCard key={i} details={item} title={details.title} showId={details.id} />
            ))}
        </section>
    );
};

export default SeasonsScreen;
