import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { getMovieDetails } from '../helpers/getMovieUtils';
import { ShowData } from '../types/tmdb';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';
import Providers from '../components/Providers';

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

    console.log(location);

    useEffect(() => {
        const handler = async () => {
            if (!details) {
                const movieDetails = await getMovieDetails(
                    parseInt(location.pathname.split('/')[2])
                );
                setDetails(movieDetails);
            }
        };
        handler();
    }, []);

    console.log(details);

    // TODO: #199 Create skeleton loader
    if (!details) return <p>Loading</p>;

    return (
        <section>
            <div className='flex'>
                <div>
                    <img
                        style={{ width: '350px', height: '550px' }}
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    ></img>
                </div>
                <div>
                    <div>
                        <h2 data-testid='show-details-heading'>{details.title}</h2>
                        {details.release_date.length === 10 && (
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
                    <div>
                        {/* {details.networks !== undefined ? (
                            details.networks.map((item, i) => (
                                <span></span>
                            ))
                        ) : (
                            <Providers id={details.id} />
                        )} */}
                        <Providers id={details.id} />
                    </div>
                    {/* TODO: #152 Include number of stars with styling, response returns rating out of 10  */}
                    <div>
                        {details.vote_average} stars out of {details.vote_count}
                    </div>
                </div>
            </div>
        </section>
    );
}
