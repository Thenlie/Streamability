import type { Meta, StoryObj } from '@storybook/react';
import { SeasonCardLoader } from '../../components';

const meta = {
    title: 'Loaders/Season Card',
    component: SeasonCardLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SeasonCardLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
