import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components';
import { Check, CloseSharp } from '@mui/icons-material';

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

export const Text: Story = {
    args: {
        title: 'Click me!',
        type: 'button',
        color: 'secondary',
        loading: false,
        disabled: false,
    },
};

export const Submit: Story = {
    args: {
        title: 'Submit',
        type: 'submit',
        color: 'success',
        loading: false,
        disabled: false,
        StartIcon: Check,
    },
};

export const Close: Story = {
    args: {
        title: 'Close',
        type: 'button',
        color: 'error',
        loading: false,
        disabled: false,
        StartIcon: CloseSharp,
    },
};
