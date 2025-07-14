import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShowCardLoader } from '../../components';

const meta = {
    title: 'Loaders/Show Card',
    component: ShowCardLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ShowCardLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
