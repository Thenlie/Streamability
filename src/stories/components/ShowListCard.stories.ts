import type { Meta, StoryObj } from '@storybook/react';
import { ShowListCard } from '../../components';
import { MOVIE_DATA } from '../../__tests__/screens/assets';
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

export const IronMan: Story = {
    args: {
        details: MOVIE_DATA[0],
        showType: 'movie',
        profile: null,
    },
};
