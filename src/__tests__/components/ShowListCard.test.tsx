import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, vi } from 'vitest';
import { ShowListCard } from '../../components';
import { MOVIE_DETAIL, PROFILE, TMDB_BASE_PATH } from '../constants';
import { DateSize, formatReleaseDate } from '../../helpers';

const mockedUseNavigate = vi.fn();
const mockSetProfile = vi.fn();

vi.mock('react-router', async () => {
    const mod = await vi.importActual<typeof import('react-router')>('react-router');
    return {
        ...mod,
        useNavigate: () => mockedUseNavigate,
    };
});

describe('Show List Card Component', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('properly renders image, title, release date, description and rating', () => {
        render(
            <MemoryRouter>
                <ShowListCard
                    details={MOVIE_DETAIL}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        // There are two images since the Rating component is an image
        const images = screen.getAllByRole('img');
        expect(screen.getByTestId('show-list-card-component')).toBeInTheDocument();
        expect(images[0]).toHaveAttribute('src', TMDB_BASE_PATH + MOVIE_DETAIL.poster_path);
        expect(screen.getByRole('link')).toHaveAttribute(
            'href',
            '/details/' + MOVIE_DETAIL.media_type + '/' + MOVIE_DETAIL.id
        );
        expect(screen.getByText(MOVIE_DETAIL.title)).toBeInTheDocument();
        expect(
            screen.getByText(
                MOVIE_DETAIL.release_date
                    ? formatReleaseDate(MOVIE_DETAIL.release_date, DateSize.MEDIUM)
                    : ''
            )
        ).toBeInTheDocument();
        expect(screen.getByText(MOVIE_DETAIL.overview || '')).toBeInTheDocument();
        expect(screen.getByTestId('rating-component')).toBeInTheDocument();
        expect(images[1]).toHaveAttribute('aria-label', '4 Stars');
    });
    it('properly renders placeholder poster when no poster is provided', () => {
        render(
            <MemoryRouter>
                <ShowListCard
                    details={{ ...MOVIE_DETAIL, poster_path: null }}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-list-card-component')).toBeInTheDocument();
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', '/poster-placeholder.jpeg');
    });
    it('does not render the release date when no release date is provided', () => {
        render(
            <MemoryRouter>
                <ShowListCard
                    details={{ ...MOVIE_DETAIL, release_date: undefined }}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-list-card-component')).toBeInTheDocument();
        expect(screen.getByText(MOVIE_DETAIL.title)).toBeInTheDocument();
        expect(
            screen.queryByText(
                MOVIE_DETAIL.release_date
                    ? formatReleaseDate(MOVIE_DETAIL.release_date, DateSize.MEDIUM)
                    : ''
            )
        ).not.toBeInTheDocument();
    });
    it('navigates to details screen when title is click', async () => {
        render(
            <MemoryRouter>
                <ShowListCard
                    details={MOVIE_DETAIL}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-list-card-component')).toBeInTheDocument();
        fireEvent.click(screen.getByText(MOVIE_DETAIL.title));
        expect(mockedUseNavigate).toHaveBeenCalledWith(
            `/details/${MOVIE_DETAIL.media_type}/${MOVIE_DETAIL.id}`
        );
    });
});
