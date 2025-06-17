import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Title,
  Description,
  Controls,
} from '@storybook/addon-docs/blocks'
import ClickConfetti from '../components/Animations/ClickConfetti'

const meta: Meta<typeof ClickConfetti> = {
  title: 'Animations/ClickConfetti',
  component: ClickConfetti,
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <>
          <Title />
          <Controls />
        </>
      ),
    },
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100vw', height: '100vh', cursor: 'pointer' }}>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        Click anywhere to see confetti!
      </div>
      <ClickConfetti {...args} />
    </div>
  ),
  args: {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
    disabled: false,
  },
}