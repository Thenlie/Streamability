import type { Meta, StoryObj } from '@storybook/react';
import { ActorCardLoader } from '../../components';

const meta = {
    title: 'Loaders/Actor Card',
    component: ActorCardLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ActorCardLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
