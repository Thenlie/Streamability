import { useState, useEffect } from 'react';
import { getTvSeasonDetails } from '../helpers';
import { SeasonDetails } from '../types';
import { Location, useLocation, Link } from 'react-router';
import { CardMedia, Typography as Typ } from '@mui/material';

/**
 * Screen to render a TV Show's Season's Episodes
 */
const SeasonDetailsScreen: React.FC = (): JSX.Element => {
    const location: Location = useLocation();
    const showId = parseInt(location.pathname.split('/')[3]);
    const seasonNum = parseInt(location.pathname.split('/')[5]);
    const [details, setDetails] = useState<SeasonDetails | null>(null);

    useEffect(() => {
        const handler = async () => {
            const seasonDetails = await getTvSeasonDetails(showId, seasonNum);
            setDetails(seasonDetails);
        };
        handler();
    }, [location]);

    return (
        <section
            data-testid='season-details-screen'
            className='m-6 flex items-center sm:items-start flex-col w-[70svw] max-w-[1380px]'
        >
            <div className='mb-3 flex flex-col sm:flex-row items-center'>
                <CardMedia
                    component='img'
                    className='rounded-sm'
                    sx={{
                        boxShadow: 5,
                        width: 58,
                        height: 87,
                    }}
                    image={
                        details?.poster_path
                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                            : '/poster-placeholder.jpeg'
                    }
                    alt={details?.name + ' poster'}
                />
                <div className='flex flex-col sm:items-start'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <Typ className='sm:pl-2' fontWeight={'bold'} variant='h4'>
                            {details?.name}
                        </Typ>
                        <Typ className='sm:pl-2'>{'(' + details?.air_date?.slice(0, 4) + ')'}</Typ>
                    </div>
                    <Link
                        className='sm:pl-2 hover:text-blue-500 cursor-pointer'
                        to={`/details/tv/${showId}/seasons`}
                    >
                        Back to Seasons
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SeasonDetailsScreen;
