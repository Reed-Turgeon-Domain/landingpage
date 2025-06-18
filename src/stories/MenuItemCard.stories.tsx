import type { Meta, StoryObj } from '@storybook/react';
import { Item } from '../components/CircularMenu/MenuItemCard';
import { type MenuItemType } from '../types';

const meta: Meta<typeof Item> = {
  title: 'Components/MenuItemCard/Item',
  component: Item,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    item: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof Item>;

const githubItem: MenuItemType = {
  type: 'Social',
  isLive: true,
  label: 'GitHub',
  href: 'https://github.com/ReedTurgeon',
  hex: '181717',
  iconType: 'github',
  segments: [0, 1, 2],
};

const blogItem: MenuItemType = {
    type: 'Project',
    isLive: true,
    label: 'My Blog',
    href: 'https://blog.reedturgeon.com',
    hex: 'f0f0f0',
    segments: [3, 4],
};

export const GitHub: Story = {
  args: {
    item: githubItem,
  },
};

export const Blog: Story = {
  args: {
    item: blogItem,
  },
};

const linkedInItem: MenuItemType = {
    type: 'Social',
    isLive: true,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/reed-turgeon/',
    iconType: 'linkedin',
    hex: '0A66C2',
    segments: [5,6]
};

export const LinkedIn: Story = {
    args: {
        item: linkedInItem,
    },
};
