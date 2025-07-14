import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from '../../components';

const meta = {
    title: 'Components/Rating',
    component: Rating,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        vote_average: 5,
        vote_count: 1,
    },
};
