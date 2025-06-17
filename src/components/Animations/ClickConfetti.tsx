import React, { useCallback, useEffect, useState } from 'react'

// TYPES
import type { Color, Colors } from './types'
import type { Point } from '../../types'

type ConfettiParticle = {
  id: number
  x: number
  y: number
  color: Color
  angle: number
  speed: number
  size: number
}

type ConfettiBurst = {
  id: number;
  particles: ConfettiParticle[];
};

type ClickConfettiProps = {
  /**
   * The colors to use for the confetti particles.
   * @default ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
   */
  colors?: Colors;
  /**
   * Disables the confetti effect.
   * @default false
   */
  disabled?: boolean;
  /**
   * The debounce time in milliseconds.
   * @default 200
   */
  debounce?: number;
}

const PARTICLE_COUNT = 20

const ClickConfetti = ({
  colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
  disabled = false,
  debounce = 200,
}: ClickConfettiProps) => {
  const [bursts, setBursts] = useState<ConfettiBurst[]>([])
  const lastClickTime = React.useRef(0)

  const handlePointerDown = useCallback((e: PointerEvent) => {
      if (disabled) return;

      const now = Date.now()
      if (now - lastClickTime.current < debounce) return;
      lastClickTime.current = now

      const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: (Math.random() * Math.PI * 2),
        speed: 2 + Math.random() * 4,
        size: 4 + Math.random() * 4,
      }))
      
      setBursts(prev => [...prev, { id: now, particles: newParticles }])
    }, [colors, debounce, disabled])
  
  useEffect(() => {
    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [handlePointerDown]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(function animate() {
      setBursts(currentBursts => {
        const updatedBursts = currentBursts.map(burst => {
          const updatedParticles = burst.particles.map(particle => ({
            ...particle,
            x: particle.x + Math.cos(particle.angle) * particle.speed,
            y: particle.y + Math.sin(particle.angle) * particle.speed,
            speed: particle.speed * 0.95,
          })).filter(p => p.speed > 0.1)
          
          return { ...burst, particles: updatedParticles }
        }).filter(b => b.particles.length > 0)
        
        return updatedBursts
      })
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-200">
      {bursts.map(burst =>
        burst.particles.map(particle => (
          <div
            key={`${burst.id}-${particle.id}`}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))
      )}
    </div>
  )
}

export default ClickConfetti 