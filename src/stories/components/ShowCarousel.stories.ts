import type { Meta, StoryObj } from '@storybook/react';
import { ShowCarousel } from '../../components';
import { MOVIE_DATA_ARRAY } from '../constants';
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show Carousel',
    component: ShowCarousel,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        reactRouter: reactRouterParameters({
            location: {
                path: '/details/movie/:id',
                pathParams: { id: MOVIE_DATA_ARRAY[0].id },
            },
            routing: {
                path: '/details/movie/:id',
                handle: 'details',
            },
        }),
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carousel: Story = {
    args: {
        data: MOVIE_DATA_ARRAY,
        size: 3,
        profile: null,
    },
};

export const CarouselWithTitle: Story = {
    args: {
        data: MOVIE_DATA_ARRAY,
        size: 3,
        profile: null,
        headerProps: {
            title: 'Example',
        },
    },
};

export const CarouselWithButton: Story = {
    args: {
        data: MOVIE_DATA_ARRAY,
        size: 3,
        profile: null,
        headerProps: {
            title: 'Example',
            hasButton: true,
            buttonTitle: 'View All',
        },
    },
};
