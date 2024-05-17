import { Rating as RatingMUI, Typography as Typ } from '@mui/material';
import { pluralizeString } from '../helpers';
import React from 'react';

interface RatingProps {
    /**
     * Average rating out of 10 based on all
     * TMDB user ratings
     */
    vote_average: number | undefined;
    /**
     * Total number of people who rated the show
     */
    vote_count: number | undefined;
}

/**
 * Shows 5 stars which are filled, half-filled, or empty
 * based on the `vote_average`
 * Text below stars reads '`vote_count` rating(s)'
 *
 * @param props | vote count and average rating
 * @returns {JSX.Element} | Stars with text below
 */
const Rating: React.FC<RatingProps> = ({ vote_average, vote_count }): JSX.Element => {
    return (
        <div className='flex flex-col my-2' data-testid='rating-component'>
            <RatingMUI
                name='half-rating'
                defaultValue={vote_average ? vote_average / 2 : 0}
                precision={0.5}
                readOnly
            />
            <Typ variant='body2' align='left' paddingLeft={0.6}>
                {vote_count} {pluralizeString(vote_count || 0, 'rating')}
            </Typ>
        </div>
    );
};

export default Rating;
