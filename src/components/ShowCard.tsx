import { useProfileContext } from '../hooks';
import { addToProfileWatchQueue, removeFromProfileWatchQueue } from '../supabase/profiles';
import { MovieDetailsData } from '../types/tmdb';
import { Link } from 'react-router-dom';
import { formatReleaseDate, DateSize } from '../helpers/dateFormatUtils';

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
    const { profile, setProfile } = useProfileContext();
    const ratingHandler = (arr: MovieDetailsData): JSX.Element | null => {
        for (let i = 0; i < arr.release_dates.results.length; i++) {
            if (arr.release_dates.results[i].iso_3166_1 === 'US') {
                return <p>{arr.release_dates.results[i].release_dates[0].certification}</p>;
            }
        }
        return null;
    };
    /**
	 * Handle card being added to or removed from
	 * a users watch queue
	 * 
	 * @param isPush | true if adding, false if removing
	 * @param show_id | movie db id being updated
	 */
    const queueHandler = async (isPush: boolean, show_id: number | undefined) => {
        if (show_id) {
            if (isPush && profile) {
                const data = await addToProfileWatchQueue(profile.id, show_id);
                setProfile(data);
            } else if (profile) {
                const data = await removeFromProfileWatchQueue(profile.id, show_id);
                setProfile(data);
            }
        }
    };

    return (
        <>
            {props.details && (
            // TODO: Style card more closely to provided design once MUI is installed
                <Link to={`/details/${props.details.id}`} state={props} >
                    <div data-testid="show-card-component">
                        <div>
                            <img style={{ width: '250px', height: '375px' }} src={`http://image.tmdb.org/t/p/w500${props.details.poster_path}`}></img>
                        </div>
                        <div>
                            <h2>{props.details.original_title}</h2>
                            {props.details.release_date.length === 10 && 
                                <span>{formatReleaseDate(props.details.release_date, DateSize.MEDIUM)}</span>
                            }
                        </div>
                        <div>
                            <p>{props.details.runtime}</p>
                        </div>
                        <div>
                            {/* TODO: #152 Include number of stars with styling, response returns rating out of 10  */}
                            <p>{props.details.vote_average} stars</p>
                            <span>{props.details.vote_count} ratings</span>
                            {ratingHandler && (
                                <div>
                                    {ratingHandler(props.details)}
                                </div>
                            )}
                        </div>
                        <button onClick={() => queueHandler(true, props.details?.id)}>Add to queue</button>
                        <button onClick={() => queueHandler(false, props.details?.id)}>Remove from queue</button>
                    </div>
                </Link>
            )}
        </>
    );
}
