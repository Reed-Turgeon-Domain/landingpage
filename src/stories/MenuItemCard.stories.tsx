import type { Meta, StoryObj } from '@storybook/react';
import { Item } from '../components/CircularMenu/MenuItemCard';
import { menuItems } from '../constants/menuItems';
import React from 'react';

const meta: Meta<typeof Item> = {
  title: 'Components/MenuItemCard/Item',
  component: Item,
  decorators: [
    (Story) => (
      <div 
        style={{ 
          backgroundColor: 'black',
          padding: '3rem',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          borderRadius: '8px'
        }}
      >
        <Story />
      </div>
    ),
  ],
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

// Manually create stories for each menu item with a href
const linkedInItem = menuItems.find(item => item.label === 'LinkedIn');
export const LinkedIn: Story = {
  args: {
    item: linkedInItem,
  },
};

const githubItem = menuItems.find(item => item.label === 'GitHub');
export const GitHub: Story = {
  args: {
    item: githubItem,
  },
};

const reachOutItem = menuItems.find(item => item.label === 'Reach Out');
export const ReachOut: Story = {
  args: {
    item: reachOutItem,
  },
};

const hourglassItem = menuItems.find(item => item.label.includes('Hourglass'));
export const Hourglass: Story = {
  args: {
    item: hourglassItem,
  },
};
