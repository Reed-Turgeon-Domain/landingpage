import React from 'react';
import { Button } from '../components/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    backgroundColor: 'transparent',
    textColor: 'black',
    border: 'border-2',
    borderColor: 'border-black',
    rounded: 'rounded-md',
  },
};

export const Red: Story = {
  args: {
    ...Default.args,
    backgroundColor: 'red',
    textColor: 'white',
    border: null,
  },
};

export const Blue: Story = {
  args: {
    ...Default.args,
    backgroundColor: 'blue',
    textColor: 'white',
    border: null,
  },
};

export const Green: Story = {
  args: {
    ...Default.args,
    backgroundColor: 'green',
    textColor: 'white',
    border: null,
  },
};