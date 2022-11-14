import { MovieDetailsData } from '../types/tmdb';
interface MovieCardProps { details: MovieDetailsData | null }
/**
 * Show cards are rendered all over the application in different situations
 * Be sure changes made to this component are either conditionally applied
 * or intended to be on every single show card
 * 
 * @returns {JSX.Element} | Single show card
 */
export default function ShowCard(props: MovieCardProps) {
	console.log(props);
	const ratingHandler = (arr: any) => {
		const newArr: any[] = [];
		arr.filter((item: any) => {
			if (item.iso_3166_1 === 'US') {
				newArr.push(item);
			}
		});
		return (
			<p>{newArr[0].release_dates[0].certification}</p>
		);
	};

	return (
		<>
			{props.details && (
				<div>
					<div>
						<img src={`http://image.tmdb.org/t/p/w500${props.details.poster_path}`}></img>
					</div>
					<div>
						<h2>{props.details.original_title}</h2>
						<span>{props.details.release_date}</span>
					</div>
					<div>
						<p>{props.details.runtime}</p>
					</div>
					<div>
						{/* TODO: Inlucde number of stars with styling, response returns rating out of 10  */}
						<p>{props.details.vote_average} stars</p>
						<span>{props.details.vote_count} ratings</span>
						<div>
							{ratingHandler(props.details.release_dates.results)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
