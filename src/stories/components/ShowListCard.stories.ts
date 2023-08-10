import type { Meta, StoryObj } from '@storybook/react';
import { ShowListCard } from '../../components';
import { MOVIE_DATA, PROFILE } from '../constants';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show List Card',
    component: ShowListCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowListCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
    args: {
        details: MOVIE_DATA,
        showType: 'movie',
        profile: null,
        isInWatchQueue: false,
    },
};

export const LoggedIn: Story = {
    args: {
        details: MOVIE_DATA,
        showType: 'movie',
        profile: PROFILE,
        isInWatchQueue: false,
    },
};
