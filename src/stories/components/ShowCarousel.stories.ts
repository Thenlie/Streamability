import type { Meta, StoryObj } from '@storybook/react';
import { ShowCarousel } from '../../components';
import { MOVIE_DATA_ARRAY } from '../../__tests__/screens/assets';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show Carousel',
    component: ShowCarousel,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
    args: {
        data: [
            MOVIE_DATA_ARRAY[0],
            MOVIE_DATA_ARRAY[1],
            MOVIE_DATA_ARRAY[2],
            MOVIE_DATA_ARRAY[3],
            MOVIE_DATA_ARRAY[4],
            MOVIE_DATA_ARRAY[5],
            MOVIE_DATA_ARRAY[6],
            MOVIE_DATA_ARRAY[7],
            MOVIE_DATA_ARRAY[8],
        ],
        size: 1,
        isLoading: false,
    },
};
