import type { Meta, StoryObj } from '@storybook/react';
import { Providers } from '../../components';

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

export const PrimaryMovie: Story = {
    args: {
        id: 157336,
        showType: 'movie',
    },
};

export const PrimaryTv: Story = {
    args: {
        id: 90462,
        showType: 'tv',
    },
};

export const Empty: Story = {
    args: {
        id: 0,
        showType: 'movie',
    },
};
