import type { Meta, StoryObj } from '@storybook/react';
import { ProvidersPlaceholder } from '../../components';

const meta = {
    title: 'Components/Providers Placeholder',
    component: ProvidersPlaceholder,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ProvidersPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        count: 1,
    },
};
