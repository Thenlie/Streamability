import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShowCarouselLoader } from '../../components';
import { withRouter } from 'storybook-addon-remix-react-router';

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

export const CarouselLoader: Story = {
    args: {},
};
