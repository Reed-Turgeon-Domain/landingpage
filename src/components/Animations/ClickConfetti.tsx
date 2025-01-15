import { useEffect, useState } from 'react'
import { type Point } from '../../types'

type ConfettiParticle = {
  id: number
  x: number
  y: number
  color: string
  angle: number
  speed: number
  size: number
}

type ClickConfettiProps = {
  position: Point
  onAnimationComplete: () => void
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
const PARTICLE_COUNT = 20

const ClickConfetti = ({ position, onAnimationComplete }: ClickConfettiProps) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      x: position.x,
      y: position.y,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      angle: (Math.random() * Math.PI * 2),
      speed: 2 + Math.random() * 4,
      size: 4 + Math.random() * 4
    }))

    setParticles(newParticles)

    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prev => {
        if (prev.length === 0) return prev

        const updated = prev.map(particle => ({
          ...particle,
          x: particle.x + Math.cos(particle.angle) * particle.speed,
          y: particle.y + Math.sin(particle.angle) * particle.speed,
          speed: particle.speed * 0.95
        })).filter(particle => particle.speed > 0.1)

        if (updated.length === 0) {
          onAnimationComplete()
        }

        return updated
      })

      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [position])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  )
}

export default ClickConfetti 