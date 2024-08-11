import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, vi } from 'vitest';
import { ShowCard } from '../../components';
import { MOVIE_DETAIL, PROFILE } from '../constants';
import useTheme from '@mui/material/styles/useTheme';
import { lightTheme } from '../../theme';
import { DateSize, formatReleaseDate } from '../../helpers';

const TMDB_BASE_PATH = 'https://image.tmdb.org/t/p/w500';
const mockedUseNavigate = vi.fn();
const mockSetProfile = vi.fn();

vi.mock('@mui/material/styles/useTheme', async () => ({
    __esModule: true,
    default: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...mod,
        useNavigate: () => mockedUseNavigate,
    };
});

describe('Show Card Component', () => {
    beforeEach(() => {
        vi.mocked(useTheme).mockReturnValue(lightTheme);
    });
    afterEach(() => {
        vi.resetAllMocks();
    });
    it('properly renders show poster, title and release date', () => {
        render(
            <MemoryRouter>
                <ShowCard details={MOVIE_DETAIL} profile={PROFILE} setProfile={mockSetProfile} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-card-component')).toBeInTheDocument();
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            TMDB_BASE_PATH + MOVIE_DETAIL.poster_path
        );
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
    });
    it('properly renders placeholder poster when no poster is provided', () => {
        render(
            <MemoryRouter>
                <ShowCard
                    details={{ ...MOVIE_DETAIL, poster_path: null }}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-card-component')).toBeInTheDocument();
        expect(screen.getByTestId('show-poster-component')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', '/poster-placeholder.jpeg');
    });
    it('does not render the release date when no release date is provided', () => {
        render(
            <MemoryRouter>
                <ShowCard
                    details={{ ...MOVIE_DETAIL, release_date: undefined }}
                    profile={PROFILE}
                    setProfile={mockSetProfile}
                />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-card-component')).toBeInTheDocument();
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
                <ShowCard details={MOVIE_DETAIL} profile={PROFILE} setProfile={mockSetProfile} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('show-card-component')).toBeInTheDocument();
        fireEvent.click(screen.getByText(MOVIE_DETAIL.title));
        expect(mockedUseNavigate).toHaveBeenCalledWith(
            `/details/${MOVIE_DETAIL.media_type}/${MOVIE_DETAIL.id}`
        );
    });
});
