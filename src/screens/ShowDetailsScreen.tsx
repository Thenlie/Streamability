import { useEffect, useState } from 'react';
import { Location, useLocation } from 'react-router-dom';
import { getMovieDetails, getMovieProviders } from '../helpers/getMovieUtils';
import { MovieProviders, MovieDetailsData } from '../types/tmdb';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';

/**
 * Screen to show more details of a specific show
 * Rendered after user clicks on show card
 * 
 * @returns {JSX.Element}
 */
export default function ShowDetailsScreen(): JSX.Element {
    const [providers, setProviders] = useState<MovieProviders>();
    const location: Location = useLocation();
    const [details, setDetails] = useState<MovieDetailsData>(location.state ? location.state.details : null);

    useEffect(() => {
        const handler = async () => {
            let data;
            if (!details) {
                const movieDetails = await getMovieDetails(parseInt(location.pathname.split('/')[2]));
                setDetails(movieDetails);
                data = await getMovieProviders(movieDetails.id);
            } else {
                data = await getMovieProviders(details.id);
            }
            setProviders(data);
        };
        handler();
    }, []);

    // TODO: #158 Possibly create utility function 
    const ratingHandler = (arr: MovieDetailsData): JSX.Element | null => {
        for (let i = 0; i < arr.release_dates.results.length; i++) {
            if (arr.release_dates.results[i].iso_3166_1 === 'US') {
                return <p>{arr.release_dates.results[i].release_dates[0].certification}</p>;
            }
        }
        return null;
    };

    // TODO: #199 Create skeleton loader
    if (!details) return <p>Loading</p>;

    return (
        <section>
            <div className='flex'>
                <div>
                    <img style={{ width: '350px', height: '550px' }} src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}></img>
                </div>
                <div>
                    <div>
                        <h2 data-testid='show-details-heading'>{details.title}</h2>
                        {details.release_date.length === 10 &&
                            <span data-testid='details-release-date'>{formatReleaseDate(details.release_date, DateSize.LONG)}</span>
                        }
                        <span> {details.runtime} minutes</span>
                        {ratingHandler(details)}
                    </div>
                    <div>
                        <p className='max-w-md'>{details.overview}</p>
                    </div>
                    {providers?.results.US !== undefined ?
                        <div>
                            {/* #161 TODO: Provide service logo instead of string with styling and positioning */}
                            {providers?.results.US.flatrate.map((item, i) => (
                                <span data-testid='details-provider' key={i}>{item.provider_name} </span>
                            ))}
                        </div>
                        :
                        <p>Sorry, no providers available for this show.</p>
                    }
                    {/* TODO: #152 Include number of stars with styling, response returns rating out of 10  */}
                    <div>{details.vote_average} stars out of {details.vote_count}</div>
                </div>
            </div>
        </section>
    );
}
