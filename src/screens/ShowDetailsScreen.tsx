import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { getMovieDetails, getMovieRecommendations } from '../helpers/getMovieUtils';
import { ShowData } from '../types';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { Providers, ShowCard } from '../components';
import { getTvDetails, getTvRecommendations } from '../helpers/getTvUtils';
import { Typography } from '@mui/material';
import { useProfileContext } from '../hooks';
import Rating from '../components/Rating';

/**
 * Screen to show more details of a specific show
 * Rendered after user clicks on show card
 *
 * @returns {JSX.Element}
 */
export default function ShowDetailsScreen(): JSX.Element {
    const { profile, setProfile } = useProfileContext();
    const location: Location = useLocation();
    const [details, setDetails] = useState<ShowData>(
        location.state ? location.state.details : null
    );
    const [recommendations, setRecommendation] = useState<ShowData[] | null>(null);
    const id = parseInt(location.pathname.split('/')[3]);
    const showType = location.pathname.split('/')[2];

    useEffect(() => {
        const handler = async () => {
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
        };
        handler();
    }, [location]);

    // TODO: #199 Create skeleton loader
    // TODO: Handle case when no details are ever returned
    if (!details) return <p>Loading</p>;

    return (
        <>
            <section className='m-3 flex'>
                <div className='rounded-md overflow-hidden mr-2'>
                    {details.poster_path ? (
                        <img
                            style={{ width: '350px', height: '550px' }}
                            src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                        ></img>
                    ) : (
                        <img
                            style={{ width: '350px', height: '550px' }}
                            src={'/poster-placeholder.jpeg'}
                        ></img>
                    )}
                </div>
                <div className='m-3'>
                    <div>
                        <Typography variant='h3' align='left' data-testid='show-details-heading'>
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
                        <Typography align='left' className='max-w-md py-3'>
                            {details.overview}
                        </Typography>
                    </div>
                    <div className='bg-primary rounded-md my-3 p-2'>
                        <Providers id={details.id} showType={showType} />
                    </div>
                </div>
            </section>
            <section className='flex flex-wrap justify-center'>
                {recommendations &&
                    recommendations.map((item, i) => (
                        <ShowCard
                            key={i}
                            details={item}
                            showType={showType}
                            profile={profile}
                            setProfile={setProfile}
                        />
                    ))}
            </section>
        </>
    );
}
