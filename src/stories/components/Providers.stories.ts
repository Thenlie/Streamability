import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../components';
import { MOVIE_DATA } from '../constants';

const meta = {
    title: 'Components/Providers',
    component: Providers,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Providers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        id: MOVIE_DATA.id,
        showType: 'movie',
    },
};
