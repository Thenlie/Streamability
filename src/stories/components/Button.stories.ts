import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components';

const meta = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        title: 'Submit',
        type: 'submit',
        color: 'secondary',
        loading: false,
        disabled: false,
    },
};
