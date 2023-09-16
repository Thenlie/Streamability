import type { Meta, StoryObj } from '@storybook/react';
import { ShowPoster } from '../../components';
import { MOVIE_DATA } from '../../__tests__/screens/assets';
import { withRouter } from 'storybook-addon-react-router-v6';
import { ProfileActions } from '../../types';

const profileActionsMock: ProfileActions = {
    removeFromQueue: async () => {},
    addToQueue: async () => {},
    removeFromFavorites: async () => {},
    addToFavorites: async () => {},
    removeFromWatched: async () => {},
    addToWatched: async () => {},
};

const meta = {
    title: 'Components/Show Poster',
    component: ShowPoster,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowPoster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        details: MOVIE_DATA[0],
        showType: 'movie',
        profileActions: profileActionsMock,
        showQueueButton: false,
        showFavoritesButton: false,
        showWatchedButton: false,
    },
};
