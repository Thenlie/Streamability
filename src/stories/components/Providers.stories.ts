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

export const Primary: Story = {
    args: {
        id: 136797,
        showType: 'movie',
    },
};

export const Empty: Story = {
    args: {
        id: 0,
        showType: 'movie',
    },
};
