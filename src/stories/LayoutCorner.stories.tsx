import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Description,
  Controls,
} from '@storybook/addon-docs/blocks'

// COMPONENTS
import { LayoutCorner } from '../components/Layout';

const meta: Meta<typeof LayoutCorner> = {
  title: 'Layout/LayoutCorner',
  component: LayoutCorner,
  argTypes: {
    corner: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    inset: {
      control: 'select',
      options: [2, 4, 6, 8],
    },
    children: {
      control: 'text',
      description: 'Content to display in the corner',
    },
    background: {
      control: 'object',
      description: 'Background colors for default and hover states.',
    },
    border: {
      control: 'object',
      description: 'Border properties for default and hover states.',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LayoutCorner>;

export const TopLeft: Story = {
  render: (args) => (
    <div className="relative w-full h-[200px]">
      <LayoutCorner {...args} />
    </div>
  ),
  args: {
    corner: 'top-left',
    inset: 4,
    children: <div className="bg-blue-500 text-white p-4 rounded">Top Left</div>,
  },
};

export const TopRight: Story = {
  render: (args) => (
    <div className="relative w-full h-[200px]">
      <LayoutCorner {...args} />
    </div>
  ),
  args: {
    corner: 'top-right',
    inset: 4,
    children: <div className="bg-green-500 text-white p-4 rounded">Top Right</div>,
  },
};

export const BottomLeft: Story = {
  render: (args) => (
    <div className="relative w-full h-[200px]">
      <LayoutCorner {...args} />
    </div>
  ),
  args: {
    corner: 'bottom-left',
    inset: 4,
    children: <div className="bg-yellow-500 text-white p-4 rounded">Bottom Left</div>,
  },
};

export const BottomRight: Story = {
  render: (args) => (
    <div className="relative w-full h-[200px]">
      <LayoutCorner {...args} />
    </div>
  ),
  args: {
    corner: 'bottom-right',
    inset: 4,
    children: <div className="bg-red-500 text-white p-4 rounded">Bottom Right</div>,
  },
}; 