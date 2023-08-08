import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../components';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Search Input',
    component: SearchInput,
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
