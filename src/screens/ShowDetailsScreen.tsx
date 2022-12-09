import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMovieProviders } from '../helpers/getMovieUtils';
import { MovieProviders, MovieDetailsData } from '../types/tmdb';

/**
 * Screen to show more details of a specific show
 * Rendered after user clicks on show card
 * 
 * @returns {JSX.Element}
 */
export default function ShowDetailsScreen(): JSX.Element {
	const [providers, setProviders] = useState<MovieProviders>();
	const location = useLocation();
	console.log(location);

	useEffect(() => {
		const handler = async () => {
			const data = await getMovieProviders(location.state.details.id);
			setProviders(data) as unknown as MovieProviders;
		};
		handler();
	}, []);

	// TODO: Possibly create utility function 
	const ratingHandler = (arr: MovieDetailsData): JSX.Element | null => {
		for (let i = 0; i < arr.release_dates.results.length; i++) {
			if (arr.release_dates.results[i].iso_3166_1 === 'US') {
				return <p>{arr.release_dates.results[i].release_dates[0].certification}</p>;
			}
		}
		return null;
	};

	return (
		<section>
			{providers && (
				<div className='flex'>
					<div>
						<img style={{ width: '350px', height: '550px' }} src={`http://image.tmdb.org/t/p/w500${location.state.details.poster_path}`}></img>
					</div>
					<div>
						<div>
							<h2>{location.state.details.title}</h2>
							{/* TODO: Format date/time */}
							<span>{location.state.details.release_date}</span>
							<span> {location.state.details.runtime} minutes</span>
							{ratingHandler(location.state.details)}
						</div>
						<div>
							<p className='max-w-md'>{location.state.details.overview}</p>
						</div>
						<div>
							{/* TODO: Provide service logo instead of string with styling and positioning */}
							{providers.results.US.flatrate.map((item, i) => (
								<span key={i}>{item.provider_name} </span>
							))}
						</div>
						{/* TODO: Include number of stars with styling, response returns rating out of 10  */}
						<div>{location.state.details.vote_average} stars out of {location.state.details.vote_count}</div>
					</div>
				</div>
			)}
		</section>
	);
}
