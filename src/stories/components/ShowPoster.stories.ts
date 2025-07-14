import type { Meta, StoryObj } from '@storybook/react-vite';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';
import { ShowPoster } from '../../components';
import { MOVIE_DATA } from '../constants';
import { ProfileActions } from '../../types';

const profileActionsMock: ProfileActions = {
    removeFromQueue: async () => {},
    addToQueue: async () => {},
    removeFromFavorites: async () => {},
    addToFavorites: async () => {},
    removeFromWatched: async () => {},
    addToWatched: async () => {},
    queueLoading: false,
    favoritesLoading: false,
    watchedLoading: false,
};

const meta = {
    title: 'Components/Show Poster',
    component: ShowPoster,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        reactRouter: reactRouterParameters({
            location: {
                path: '/details/movie/:id',
                pathParams: { id: MOVIE_DATA.id },
            },
            routing: {
                path: '/details/movie/:id',
                handle: 'details',
            },
        }),
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowPoster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        details: MOVIE_DATA,
        profile: null,
        profileActions: profileActionsMock,
        showQueueButton: false,
        showFavoritesButton: false,
        showWatchedButton: false,
    },
};
