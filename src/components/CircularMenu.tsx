import { useState, useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

function CircularMenu() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)

  const constrainToViewport = (x: number, y: number): Point => {
    const ballSize = 16
    const padding = 4
    
    return {
      x: Math.min(Math.max(x, ballSize/2 + padding), window.innerWidth - ballSize/2 - padding),
      y: Math.min(Math.max(y, ballSize/2 + padding), window.innerHeight - ballSize/2 - padding)
    }
  }

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

  const getBallPosition = () => {
    if (!circleRef.current) return { left: '50%', top: '50%' }

    const rect = circleRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const radius = rect.width / 2

    const rawX = centerX + Math.cos(angle) * radius
    const rawY = centerY + Math.sin(angle) * radius

    const { x, y } = constrainToViewport(rawX, rawY)

    return {
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)'
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div 
        ref={circleRef}
        className="relative w-[600px] h-[600px] border-2 border-black/30 border-dashed rounded-full"
      >
        <div 
          className="fixed w-4 h-4 bg-orange-500/80 rounded-full"
          style={getBallPosition()}
        />
      </div>

      <div className="hidden fixed top-4 left-4 text-black/50">
        Mouse: {Math.round(mousePos.x)}, {Math.round(mousePos.y)}
        <br />
        Angle: {Math.round(angle * 180 / Math.PI)}°
      </div>
    </div>
  )
}

export default CircularMenu
