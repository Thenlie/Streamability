import type { Meta, StoryObj } from '@storybook/react';
import { ShowListCardPlaceholder } from '../../components';

const meta = {
    title: 'Components/Show List Card Placeholder',
    component: ShowListCardPlaceholder,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ShowListCardPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
