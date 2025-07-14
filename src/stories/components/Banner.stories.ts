import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from '../../components';
import { MOVIE_DATA_ARRAY } from '../constants';
import { withRouter } from 'storybook-addon-remix-react-router';

const meta = {
    title: 'Components/Banner',
    component: Banner,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [withRouter],
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IronMan: Story = {
    args: {
        data: MOVIE_DATA_ARRAY,
        title: 'Checkout this awesome title!',
        renderSearchInput: true,
        renderLogo: true,
    },
};
