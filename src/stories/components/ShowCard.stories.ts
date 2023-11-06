import type { Meta, StoryObj } from '@storybook/react';
import { ShowCard } from '../../components';
import { MOVIE_DATA } from '../constants';
import { withRouter, reactRouterParameters } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show Card',
    component: ShowCard,
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
} satisfies Meta<typeof ShowCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IronMan: Story = {
    args: {
        details: MOVIE_DATA,
        profile: null,
    },
};
