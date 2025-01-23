import type { Meta, StoryObj } from '@storybook/react';
import { SeasonCard } from '../../components';
import { SEASON } from '../constants';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

const meta = {
    title: 'Components/Season Card',
    component: SeasonCard,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        reactRouter: reactRouterParameters({
            location: {
                path: '/details/tv/:show_id',
                pathParams: { show_id: SEASON.show_id },
            },
            routing: {
                path: '/details/tv/:show_id',
                handle: 'details',
            },
        }),
    },
    decorators: [withRouter],
} satisfies Meta<typeof SeasonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Season: Story = {
    args: {
        details: SEASON,
    },
};
