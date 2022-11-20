import { MovieDetailsData } from '../types/tmdb';

interface MovieCardProps { details: MovieDetailsData | null }

/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 * 
 * @param props | returns details object passed from SearchResultScreen.tsx
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard(props: MovieCardProps): JSX.Element {
	const ratingHandler = (arr: MovieDetailsData): JSX.Element | null => {
		for (let i = 0; i < arr.release_dates.results.length; i++) {
			if (arr.release_dates.results[i].iso_3166_1 === 'US') {
				return <p>{arr.release_dates.results[i].release_dates[0].certification}</p>;
			}
		}
		return null;
	};

	return (
		<>
			{props.details && (
				// TODO: Style card more closely to provided design once MUI is installed
				<div data-testid="show-card-component">
					<div>
						<img style={{ width: '250px', height: '375px' }} src={`http://image.tmdb.org/t/p/w500${props.details.poster_path}`}></img>
					</div>
					<div>
						<h2>{props.details.original_title}</h2>
						<span>{props.details.release_date}</span>
					</div>
					<div>
						<p>{props.details.runtime}</p>
					</div>
					<div>
						{/* TODO: Include number of stars with styling, response returns rating out of 10  */}
						<p>{props.details.vote_average} stars</p>
						<span>{props.details.vote_count} ratings</span>
						{ratingHandler && (
							<div>
								{ratingHandler(props.details)}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}