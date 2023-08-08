import type { Meta, StoryObj } from '@storybook/react';
import { ShowCard } from '../components';
import { MOVIE_DATA } from '../__tests__/screens/assets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show Card',
    component: ShowCard,
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        details: MOVIE_DATA[0],
        showType: 'movie',
        profile: null,
    },
};
