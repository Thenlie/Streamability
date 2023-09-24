import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../components';
import { CheckCircle } from '@mui/icons-material';

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

export const Primary: Story = {
    args: {
        titleAccess: 'Submit',
        color: 'success',
        Icon: CheckCircle,
    },
};
