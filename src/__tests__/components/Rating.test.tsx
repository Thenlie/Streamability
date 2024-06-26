import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import { Rating } from '../../components';
import { MOVIE_DETAIL } from '../constants';

describe('Rating Component', () => {
    it('displays the proper number of stars with the correct subtitle', () => {
        const { rerender } = render(
            <Rating vote_average={MOVIE_DETAIL.vote_average} vote_count={MOVIE_DETAIL.vote_count} />
        );
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(screen.getByText(`${MOVIE_DETAIL.vote_count} ratings`)).toBeInTheDocument();
        // One icon is shown for each half star
        expect(screen.getAllByTestId('StarIcon')).toHaveLength(8);
        expect(screen.getAllByTestId('StarBorderIcon')).toHaveLength(2);

        rerender(<Rating vote_average={1} vote_count={2831} />);
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(screen.getByText('2831 ratings')).toBeInTheDocument();
        expect(screen.getAllByTestId('StarIcon')).toHaveLength(1);
        expect(screen.getAllByTestId('StarBorderIcon')).toHaveLength(9);
    });
    it('displays singular subtitle when there is only one vote', async () => {
        render(<Rating vote_average={MOVIE_DETAIL.vote_average} vote_count={1} />);
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(screen.getByText('1 rating')).toBeInTheDocument();
    });
});
