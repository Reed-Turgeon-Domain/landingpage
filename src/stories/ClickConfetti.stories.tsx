import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ClickConfetti from '../components/Animations/ClickConfetti'
import { type Point } from '../types'

const meta: Meta<typeof ClickConfetti> = {
  title: 'Animations/ClickConfetti',
  component: ClickConfetti,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta

const InteractiveStory = () => {
  const [confetti, setConfetti] = useState<{ id: number, position: Point }[]>(
    [],
  )

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setConfetti(currentConfetti => [
      ...currentConfetti,
      {
        id: Date.now(),
        position: { x: event.clientX, y: event.clientY },
      },
    ])
  }

  const handleAnimationComplete = (id: number) => {
    setConfetti(currentConfetti => currentConfetti.filter(c => c.id !== id))
  }

  return (
    <div
      style={{ width: '100vw', height: '100vh', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        Click anywhere to see confetti!
      </div>
      {confetti.map(({ id, position }) => (
        <ClickConfetti
          key={id}
          position={position}
          onAnimationComplete={() => handleAnimationComplete(id)}
        />
      ))}
    </div>
  )
}

export const Default: StoryObj<typeof meta> = {
  render: () => <InteractiveStory />,
}
