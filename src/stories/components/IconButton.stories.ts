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
        color: 'success',
        Icon: CheckCircle,
        tooltip: 'Confirm',
    },
};

export const Deny: Story = {
    args: {
        titleAccess: 'Deny',
        color: 'error',
        Icon: Cancel,
        tooltip: 'Deny',
    },
};
