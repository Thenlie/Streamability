import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import {
    getMovieDetails,
    getMovieRecommendations,
    formatReleaseDate,
    DateSize,
    getTvDetails,
    getTvRecommendations,
} from '../helpers';
import { ShowData } from '../types';
import { Providers, ShowCarousel, Rating } from '../components';
import { Typography } from '@mui/material';
import { ShowDetailsLoader } from './loaders';

/**
 * Screen to show more details of a specific show
 * Rendered after user clicks on show card
 *
 * @returns {JSX.Element}
 */
export default function ShowDetailsScreen(): JSX.Element {
    const location: Location = useLocation();
    const [details, setDetails] = useState<ShowData>(
        location.state ? location.state.details : null
    );
    const [recommendations, setRecommendation] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const id = parseInt(location.pathname.split('/')[3]);
    const showType = location.pathname.split('/')[2];

    const fallbackText = 'Sorry, we could not find any recommendations based on this title.';

    useEffect(() => {
        const handler = async () => {
            setLoading(true);
            if (showType === 'movie') {
                const movieDetails = await getMovieDetails(id);
                setDetails(movieDetails);
                const recommendation = await getMovieRecommendations(id);
                if (recommendation) setRecommendation(recommendation);
            } else {
                const tvDetails = await getTvDetails(id);
                setDetails(tvDetails);
                const recommendation = await getTvRecommendations(id);
                if (recommendation) setRecommendation(recommendation);
            }
            setLoading(false);
        };
        handler();
    }, [location]);

    if (loading) {
        return <ShowDetailsLoader />;
    }

    // TODO: #438 Handle case when no details are ever returned
    if (!details) {
        return <p>No details found!</p>;
    }

    return (
        <>
            <section className='m-6 flex flex-col md:flex-row'>
                <div className='rounded-md m-auto w-[350px] h-[550px]'>
                    <img
                        style={{
                            width: '350px',
                            height: '550px',
                            maxWidth: 'none',
                            borderRadius: '5px',
                        }}
                        src={
                            details.poster_path
                                ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                                : '/poster-placeholder.jpeg'
                        }
                    ></img>
                </div>
                <div className='m-3 max-w-xl'>
                    <div>
                        <Typography
                            variant='h3'
                            align='left'
                            className='max-w-lg'
                            data-testid='show-details-heading'
                        >
                            {details.title}
                        </Typography>
                        {details.release_date && details.release_date.length === 10 && (
                            <Typography align='left' data-testid='details-release-date'>
                                {formatReleaseDate(details.release_date, DateSize.LONG)}
                            </Typography>
                        )}
                        <Typography align='left'>{details.age_rating}</Typography>
                        {details.runtime && (
                            <Typography align='left' variant='body2'>
                                {details.runtime} minutes
                            </Typography>
                        )}
                    </div>
                    <Rating
                        vote_average={details.vote_average || 0}
                        vote_count={details.vote_count || 0}
                    />
                    <div>
                        <Typography align='left' className='py-3'>
                            {details.overview}
                        </Typography>
                    </div>
                    <div className='bg-primary rounded-md my-3 p-2'>
                        <Providers id={details.id} showType={showType} />
                    </div>
                </div>
            </section>
            <section className='pb-6'>
                <ShowCarousel data={recommendations} fallbackText={fallbackText} />
            </section>
        </>
    );
}
