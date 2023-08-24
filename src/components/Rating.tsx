import { Rating as RatingMUI, Typography } from '@mui/material';
import { pluralizeString } from '../helpers';

interface RatingProps {
    /**
     * Average rating out of 10 based on all
     * TMDB user ratings
     */
    vote_average: number;
    /**
     * Total number of people who rated the show
     */
    vote_count: number;
}

/**
 * Shows 5 stars which are filled, half-filled, or empty
 * based on the `vote_average`
 * Text below stars reads '`vote_count` rating(s)'
 *
 * @param props | vote count and average rating
 * @returns {JSX.Element} | Stars with text below
 */
export default function Rating({ vote_average, vote_count }: RatingProps): JSX.Element {
    return (
        <div className='flex flex-col my-2'>
            <RatingMUI
                name='half-rating'
                defaultValue={vote_average / 2}
                precision={0.5}
                readOnly
            />
            <Typography variant='body2' align='left' paddingLeft={0.6}>
                {vote_count} {pluralizeString(vote_count, 'rating')}
            </Typography>
        </div>
    );
}
