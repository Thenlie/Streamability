import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '../../components';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
    title: 'Components/Search Input',
    component: SearchInput,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
