import '@testing-library/jest-dom';
import { fireEvent, render, screen, act, within } from '@testing-library/react';
import { EpisodeCard } from '../../components/';
import { EPISODE, EPISODE_DETAILS, TMDB_IMG_BASE_PATH } from '../constants';
import { MemoryRouter } from 'react-router';
import { formatReleaseDate, DateSize, getTvEpisodeDetails } from '../../helpers';
import { describe, it, vi } from 'vitest';

vi.mock('../../helpers', async () => {
    const actual = await vi.importActual('../../helpers');

    return {
        ...(actual as object),
        getTvEpisodeDetails: vi.fn(),
    };
});

describe('Episode Card', () => {
    it('Properly renders default episode data on mobile viewports', () => {
        act(() => {
            window.innerWidth = 640;
            window.dispatchEvent(new Event('resize'));
        });
        render(
            <MemoryRouter>
                <EpisodeCard details={EPISODE} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        expect(screen.getByAltText(`${EPISODE.name} poster`)).toBeInTheDocument();
        expect(screen.getByText(`${EPISODE.episode_number}.`)).toBeInTheDocument();
        expect(screen.getByText(EPISODE.name)).toBeInTheDocument();
    });
    it('properly expands when pressed on mobile viewports and renders additional episode data', async () => {
        vi.mocked(getTvEpisodeDetails).mockResolvedValue(EPISODE_DETAILS);

        await act(async () => {
            window.innerWidth = 640;
            window.dispatchEvent(new Event('resize'));
        });

        render(
            <MemoryRouter>
                <EpisodeCard details={EPISODE} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText('Expand'));
        });

        expect(screen.getByText(EPISODE.vote_average)).toBeInTheDocument();
        expect(
            screen.getByText(formatReleaseDate(EPISODE.air_date, DateSize.MEDIUM))
        ).toBeInTheDocument();
        expect(screen.getByText(`${EPISODE.runtime}m`));
        expect(screen.getByText(EPISODE.overview)).toBeInTheDocument();

        expect(screen.getByText('Cast')).toBeInTheDocument();
        EPISODE_DETAILS.credits.cast.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.character)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });

        expect(screen.getByText('Guest Stars')).toBeInTheDocument();
        EPISODE.guest_stars.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.character)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });

        expect(screen.getByText('Crew')).toBeInTheDocument();
        EPISODE.crew.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.job)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });
    });
    it('properly renders fallback text and/or placeholder image on mobile viewports', async () => {
        vi.mocked(getTvEpisodeDetails).mockResolvedValue({
            ...EPISODE_DETAILS,
            credits: { cast: [] },
        });

        await act(async () => {
            window.innerWidth = 640;
            window.dispatchEvent(new Event('resize'));
        });

        render(
            <MemoryRouter>
                <EpisodeCard
                    details={{
                        ...EPISODE,
                        still_path: '',
                        overview: '',
                        guest_stars: [],
                        crew: [],
                    }}
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        expect(screen.getByAltText(`${EPISODE.name} poster`)).toHaveAttribute(
            'src',
            '/poster-placeholder.jpeg'
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Expand'));
        });

        expect(screen.getByText("Sorry, we don't have additional information about this episode!"));
    });
    it('properly renders default episode data on tablet+ viewports', async () => {
        act(() => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });
        render(
            <MemoryRouter>
                <EpisodeCard details={EPISODE} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        expect(screen.getByAltText(`${EPISODE.name} poster`)).toBeInTheDocument();
        expect(screen.getByText(`${EPISODE.episode_number}.`)).toBeInTheDocument();
        expect(screen.getByText(EPISODE.name)).toBeInTheDocument();
        expect(screen.getByText(EPISODE.vote_average)).toBeInTheDocument();
        expect(
            screen.getByText(formatReleaseDate(EPISODE.air_date, DateSize.MEDIUM))
        ).toBeInTheDocument();
        expect(screen.getByText(`${EPISODE.runtime}m`));
        expect(screen.getByText(EPISODE.overview)).toBeInTheDocument();
    });
    it('properly expands menu when pressed on tablet+ viewports and renders additional episode data', async () => {
        vi.mocked(getTvEpisodeDetails).mockResolvedValue(EPISODE_DETAILS);

        await act(async () => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        render(
            <MemoryRouter>
                <EpisodeCard details={EPISODE} />
            </MemoryRouter>
        );
        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        await act(async () => {
            fireEvent.click(screen.getByText('Expand'));
        });

        expect(screen.getByText('Cast')).toBeInTheDocument();
        EPISODE_DETAILS.credits.cast.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.character)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });

        expect(screen.getByText('Guest Stars')).toBeInTheDocument();
        EPISODE.guest_stars.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.character)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });

        expect(screen.getByText('Crew')).toBeInTheDocument();
        EPISODE.crew.map((item) => {
            expect(screen.getByAltText(`${item.name} poster`).parentElement).toHaveAttribute(
                'href',
                `/details/actor/${item.id}`
            );
            const actorContainer = within(
                screen.getByAltText(`${item.name} poster`).parentElement!
            );
            expect(actorContainer.getByText(item.job)).toBeInTheDocument();
            expect(actorContainer.getByText(item.name)).toBeInTheDocument();
            expect(actorContainer.getByRole('img')).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.profile_path
            );
        });

        expect(screen.getByText('Episode Images')).toBeInTheDocument();
        const menu = within(screen.getByTestId('episode-card-component-menu'));
        EPISODE_DETAILS.images?.stills.map((item, i) => {
            expect(menu.getByAltText(`episode image ${i}`)).toHaveAttribute(
                'src',
                TMDB_IMG_BASE_PATH + item.file_path
            );
        });
    });
    it('properly renders fallback text and/or placeholder image on tablet+ viewports', async () => {
        vi.mocked(getTvEpisodeDetails).mockResolvedValue({
            ...EPISODE_DETAILS,
            credits: { cast: [] },
            images: { stills: [] },
        });

        await act(async () => {
            window.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        render(
            <MemoryRouter>
                <EpisodeCard details={{ ...EPISODE, still_path: '', guest_stars: [], crew: [] }} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('episode-card-component')).toBeInTheDocument();
        expect(screen.getByAltText(`${EPISODE.name} poster`)).toHaveAttribute(
            'src',
            '/poster-placeholder.jpeg'
        );

        await act(async () => {
            fireEvent.click(screen.getByText('Expand'));
        });

        expect(screen.getByText("Sorry, we don't have additional information about this episode!"));
    });
});
