import type { Meta, StoryObj } from '@storybook/react';
import { ShowCarouselLoader } from '../../components';
import { withRouter } from 'storybook-addon-react-router-v6';

const meta = {
    title: 'Loaders/Show Carousel',
    component: ShowCarouselLoader,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
    decorators: [withRouter],
} satisfies Meta<typeof ShowCarouselLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CarouselPlaceholder: Story = {
    args: {
        count: 3,
    },
};
