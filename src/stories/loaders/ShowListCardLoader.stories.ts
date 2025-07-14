import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShowListCardLoader } from '../../components';

const meta = {
    title: 'Loaders/Show List Card',
    component: ShowListCardLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ShowListCardLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
