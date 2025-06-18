import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Title,
  Description,
  Controls,
} from '@storybook/addon-docs/blocks'

// COMPONENTS
import { WDYDTW } from '../components/WDYDTW'
import { wdydtwData } from '../components/WDYDTW/mock'

const meta: Meta<typeof WDYDTW> = {
  title: 'Components/WDYDTW',
  component: WDYDTW,
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
  argTypes: {
    data: {
      control: 'object',
      description: 'The data for the weekly submissions.',
    },
    today: {
      control: 'date',
      description: 'The current date to determine which submissions are shown.',
    },
  },
}

export default meta
type Story = StoryObj<typeof WDYDTW>

export const Default: Story = {
  render: (args) => (
    <div className="relative w-full h-screen">
      <div className="p-4 font-sans">
        This story demonstrates the WDYDTW component. It is absolutely
        positioned in the bottom right corner.
      </div>
      <WDYDTW {...args} />
    </div>
  ),
  args: {
    data: wdydtwData,
    today: new Date(),
  },
}
