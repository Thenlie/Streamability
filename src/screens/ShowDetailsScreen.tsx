import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { getMovieDetails, getMovieRecommendations } from '../helpers/getMovieUtils';
import { ShowData } from '../types';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import { Providers, ShowCard } from '../components';
import { getTvDetails, getTvRecommendations } from '../helpers/getTvUtils';

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
    if (!details) return <p>Loading</p>;

    return (
        <>
            <section className='m-3 flex'>
                <div>
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
                <div>
                    <div>
                        <h2 data-testid='show-details-heading'>{details.title}</h2>
                        {details.release_date && details.release_date.length === 10 && (
                            <span data-testid='details-release-date'>
                                {formatReleaseDate(details.release_date, DateSize.LONG)}
                            </span>
                        )}
                        <span> {details.runtime} minutes</span>
                        <span> {details.age_rating} </span>
                    </div>
                    <div>
                        <p className='max-w-md'>{details.overview}</p>
                    </div>
                    <Providers details={details} />
                    {/* TODO: #152 Include number of stars with styling, response returns rating out of 10  */}
                    <div>
                        {details.vote_average} stars out of {details.vote_count}
                    </div>
                </div>
            </section>
            <section className='flex flex-wrap justify-center'>
                {recommendations &&
                    recommendations.map(
                        (item, i) => item && <ShowCard key={i} details={item} showType={showType} />
                    )}
            </section>
        </>
    );
}
