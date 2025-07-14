import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShowPosterLoader } from '../../components';

const meta = {
    title: 'Loaders/Show Poster',
    component: ShowPosterLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ShowPosterLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
