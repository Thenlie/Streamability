import type { Meta, StoryObj } from '@storybook/react';
import { EpisodeCard } from '../../components';
import { EPISODE } from '../constants';
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

const meta = {
    title: 'Components/Episode Card',
    component: EpisodeCard,
    tags: ['autodocs'],
    parameters: {
        reactRouter: reactRouterParameters({
            location: {
                path: '/details/tv/:show_id/seasons/:season_num',
                pathParams: { show_id: EPISODE.show_id, season_num: EPISODE.season_number },
            },
            routing: {
                path: '/details/tv/:show_id/seasons/:season_num',
                handle: 'details',
            },
        }),
    },
    decorators: [withRouter],
} satisfies Meta<typeof EpisodeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Episode: Story = {
    args: {
        details: EPISODE,
    },
};
