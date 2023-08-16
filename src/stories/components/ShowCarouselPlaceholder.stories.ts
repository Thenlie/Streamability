import type { Meta, StoryObj } from '@storybook/react';
import { ShowCarouselPlaceholder } from '../../components';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Components/Show Carousel Placeholder',
    component: ShowCarouselPlaceholder,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowCarouselPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselPlaceholder: Story = {
    args: {
        count: 3,
    },
};
