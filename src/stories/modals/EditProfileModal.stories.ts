import type { Meta, StoryObj } from '@storybook/react';
import { EditProfileModal } from '../../components';
import { PROFILE, SESSION } from '../constants';

const meta = {
    title: 'Modals/Edit Profile',
    component: EditProfileModal,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof EditProfileModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        session: SESSION,
        profile: PROFILE,
        setProfile: () => {},
    },
};
