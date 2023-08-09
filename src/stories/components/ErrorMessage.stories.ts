import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from '../../components';

const meta = {
    title: 'Components/Error Message',
    component: ErrorMessage,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        message: 'This is a demo error',
    },
};
