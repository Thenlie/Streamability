import type { Meta, StoryObj } from '@storybook/react';
import { ProvidersLoader } from '../../components';

const meta = {
    title: 'Components/Providers Loader',
    component: ProvidersLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ProvidersLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 4,
    },
};
