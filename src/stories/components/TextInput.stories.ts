import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from '../../components';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
    title: 'Components/Text Input',
    component: TextInput,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label: 'Email',
    },
};

export const Search: Story = {
    args: {
        label: 'Search',
        variant: 'outlined',
    },
};
