import type { Meta, StoryObj } from '@storybook/react';
import { SubmitButton } from '../../components';

const meta = {
    title: 'Components/Submit Button',
    component: SubmitButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof SubmitButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
