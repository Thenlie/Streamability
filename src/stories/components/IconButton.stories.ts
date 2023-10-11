import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../components';
import { Cancel, CheckCircle } from '@mui/icons-material';

const meta = {
    title: 'Components/Icon Button',
    component: IconButton,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
    args: {
        titleAccess: 'Confirm',
        color: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c',
            contrastText: '#fff',
        },
        Icon: CheckCircle,
        tooltip: 'Confirm',
    },
};

export const Deny: Story = {
    args: {
        titleAccess: 'Deny',
        color: {
            light: '#ef5350',
            main: '#e53935',
            dark: '#b71c1c',
            contrastText: '#fff',
        },
        Icon: Cancel,
        tooltip: 'Deny',
    },
};
