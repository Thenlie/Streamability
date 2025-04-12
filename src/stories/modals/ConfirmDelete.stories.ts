import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDeleteModal } from '../../components';

const meta = {
    title: 'Modals/Confirm Delete Profile',
    component: ConfirmDeleteModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ConfirmDeleteModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        deleteProfile: () => {},
        loading: false,
    },
};
