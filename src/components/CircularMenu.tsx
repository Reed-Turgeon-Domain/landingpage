import { useState, useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

function CircularMenu() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateTarget = (e: MouseEvent) => {
      if (!circleRef.current) return

      const rect = circleRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const newAngle = Math.atan2(mouseY, mouseX)
      setAngle(newAngle)
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateTarget)
    return () => window.removeEventListener('mousemove', updateTarget)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
      <div 
        ref={circleRef}
        className="relative w-[600px] h-[600px] border-2 border-white rounded-full"
      >
        <div 
          className="absolute w-4 h-4 bg-orange-500 rounded-full"
          style={{
            left: `${50 + Math.cos(angle) * 50}%`,
            top: `${50 + Math.sin(angle) * 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <div className="fixed top-4 left-4 text-white">
        Mouse: {Math.round(mousePos.x)}, {Math.round(mousePos.y)}
        <br />
        Angle: {Math.round(angle * 180 / Math.PI)}°
      </div>
    </div>
  )
}

export default CircularMenu
