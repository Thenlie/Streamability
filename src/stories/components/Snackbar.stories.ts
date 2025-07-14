import type { Meta, StoryObj } from '@storybook/react-vite';
import { Snackbar } from '../../components';

const meta = {
    title: 'Components/Snackbar',
    component: Snackbar,
    tags: ['autodocs'],
    parameters: {
        docs: {
            story: {
                inline: false,
                iframeHeight: 100,
            },
        },
    },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        isOpen: true,
        severity: 'success',
        message: 'This is a success message',
        isStatic: true,
    },
};

export const Error: Story = {
    args: {
        isOpen: true,
        severity: 'error',
        message: 'This is an error message',
        isStatic: true,
    },
};

export const Info: Story = {
    args: {
        isOpen: true,
        severity: 'info',
        message: 'This is an info message',
        isStatic: true,
    },
};

export const Warn: Story = {
    args: {
        isOpen: true,
        severity: 'warning',
        message: 'This is a warning message',
        isStatic: true,
    },
};
