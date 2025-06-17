import React from 'react';
import { LayoutCorner } from '../components/Layout';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LayoutCorner> = {
  title: 'Layout/LayoutCorner',
  component: LayoutCorner,
  tags: ['autodocs'],
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
};

export default meta;
type Story = StoryObj<typeof LayoutCorner>;

export const TopLeft: Story = {
  args: {
    corner: 'top-left',
    inset: 4,
    children: <div className="bg-blue-500 text-white p-4 rounded">Top Left</div>,
  },
};

export const TopRight: Story = {
  args: {
    corner: 'top-right',
    inset: 4,
    children: <div className="bg-green-500 text-white p-4 rounded">Top Right</div>,
  },
};

export const BottomLeft: Story = {
  args: {
    corner: 'bottom-left',
    inset: 4,
    children: <div className="bg-yellow-500 text-white p-4 rounded">Bottom Left</div>,
  },
};

export const BottomRight: Story = {
  args: {
    corner: 'bottom-right',
    inset: 4,
    children: <div className="bg-red-500 text-white p-4 rounded">Bottom Right</div>,
  },
}; 