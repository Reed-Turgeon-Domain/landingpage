import type { Meta, StoryObj } from '@storybook/react';
import { Item } from '../components/CircularMenu/MenuItemCard';
import { type MenuItemType } from '../types';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdAlternateEmail } from 'react-icons/md';
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

const githubItem: MenuItemType = {
  type: 'Social',
  isLive: true,
  label: 'GitHub',
  href: 'https://github.com/ReedTurgeon',
  hex: '181717',
  Icon: <FaGithub size={24} />,
  segments: [0, 1, 2],
};

const emailItem: MenuItemType = {
  type: 'Personal',
  isLive: true,
  label: 'Reach out',
  href: 'mailto:reed@reedturgeon.com',
  hex: 'D14836',
  Icon: <MdAlternateEmail size={24} />,
  segments: [7,8],
};

const follyoItem: MenuItemType = {
    type: 'Project',
    isLive: true,
    label: 'FOLLYo',
    href: 'https://apps.apple.com/us/app/follyo-the-app-for-follies/id6478720253',
    hex: '1E90FF',
    segments: [9,10]
};

const hourglassItem: MenuItemType = {
    type: 'Project',
    isLive: true,
    label: 'Hourglass',
    href: 'https://hourglass.reedturgeon.com/',
    hex: 'FFD700',
    segments: [11,12]
};

export const GitHub: Story = {
  args: {
    item: githubItem,
  },
};

export const Email: Story = {
    args: {
        item: emailItem,
    },
};

export const FOLLYo: Story = {
    args: {
        item: follyoItem,
    },
};

export const Hourglass: Story = {
    args: {
        item: hourglassItem,
    },
};

const linkedInItem: MenuItemType = {
    type: 'Social',
    isLive: true,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/reed-turgeon/',
    Icon: <FaLinkedin size={24} />,
    hex: '0A66C2',
    segments: [5,6]
};

export const LinkedIn: Story = {
    args: {
        item: linkedInItem,
    },
};
