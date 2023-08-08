import type { Meta, StoryObj } from '@storybook/react';
import { ShowCardPlaceholder } from '../../components';

const meta = {
    title: 'Components/Show Card Placeholder',
    component: ShowCardPlaceholder,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ShowCardPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
