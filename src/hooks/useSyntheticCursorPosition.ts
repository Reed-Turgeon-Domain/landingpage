import { useState, useEffect } from 'react'
import { type Point } from '../types/index'

type UseSyntheticCursorPositionProps = {
  mousePosition: Point
  circleCenter: Point
  radius: number
  mouseInViewport: boolean
}

export const useSyntheticCursorPosition = ({
  mousePosition,
  circleCenter,
  radius,
  mouseInViewport
}: UseSyntheticCursorPositionProps) => {
  const [syntheticPosition, setSyntheticPosition] = useState<Point>({ x: 0, y: 0 })

  useEffect(() => {
    if (!mouseInViewport) {
      setSyntheticPosition({ x: 0, y: 0 })
      return
    }

    const angle = Math.atan2(
      mousePosition.y - circleCenter.y,
      mousePosition.x - circleCenter.x
    )

    setSyntheticPosition({
      x: circleCenter.x + radius * Math.cos(angle),
      y: circleCenter.y + radius * Math.sin(angle)
    })
  }, [mousePosition, circleCenter, radius, mouseInViewport])

  return syntheticPosition
} 