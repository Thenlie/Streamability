import RatingMUI from '@mui/material/Rating';
import Typ from '@mui/material/Typography';
import { pluralizeString } from '../helpers';
import React, { useEffect, useState } from 'react';

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
 * @returns {React.JSX.Element} | Stars with text below
 */
const Rating: React.FC<RatingProps> = ({ vote_average, vote_count }): React.JSX.Element => {
    const [rating, setRating] = useState(vote_average ? vote_average / 2 : 0);

    useEffect(() => {
        setRating(vote_average ? vote_average / 2 : 0);
    }, [vote_average]);

    return (
        <div className='flex flex-col my-2' data-testid='rating-component'>
            <RatingMUI name='half-rating' value={rating} precision={0.5} readOnly />
            <Typ variant='body2' align='left' paddingLeft={0.6}>
                {vote_count} {pluralizeString(vote_count || 0, 'rating')}
            </Typ>
        </div>
    );
};

export default Rating;
