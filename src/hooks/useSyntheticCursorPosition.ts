import { useState, useEffect } from 'react'
import { type Point } from '../types/index'

type UseSyntheticCursorPositionProps = {
  mousePosition: Point | null
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
  const [syntheticPosition, setSyntheticPosition] = useState<Point | null>(null)

  useEffect(() => {
    if (!mouseInViewport || !mousePosition) {
      setSyntheticPosition(null)
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