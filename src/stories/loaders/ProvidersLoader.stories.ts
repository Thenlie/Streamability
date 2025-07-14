import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProvidersLoader } from '../../components';

const meta = {
    title: 'Loaders/Providers',
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
