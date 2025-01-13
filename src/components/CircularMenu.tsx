import { useState, useEffect, useRef } from 'react'

type Point = {
  x: number
  y: number
}

type MenuItem = {
  label: string
  angle: number
}

function CircularMenu() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)
  const circleRef = useRef<HTMLDivElement>(null)

  const menuItems: MenuItem[] = [
    { label: "Item 1", angle: -Math.PI / 4 },
    { label: "Item 2", angle: Math.PI / 4 },
    { label: "Item 3", angle: 3 * Math.PI / 4 },
    { label: "Item 4", angle: 5 * Math.PI / 4 },
  ]

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

  const getItemVisibility = (itemAngle: number) => {
    const angleDiff = Math.abs(normalizeAngle(angle - itemAngle))
    const threshold = Math.PI / 4 // 45 degrees threshold
    const opacity = Math.max(0, 1 - (angleDiff / threshold))
    return opacity
  }

  const normalizeAngle = (angle: number): number => {
    while (angle < -Math.PI) angle += 2 * Math.PI
    while (angle > Math.PI) angle -= 2 * Math.PI
    return angle
  }

  const getItemPosition = (itemAngle: number) => {
    if (!circleRef.current) return { left: '50%', top: '50%' }

    const rect = circleRef.current.getBoundingClientRect()
    const radius = rect.width / 2 - 20
    const x = radius * Math.cos(itemAngle)
    const y = radius * Math.sin(itemAngle)
    const opacity = getItemVisibility(itemAngle)

    return {
      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
      opacity,
      transition: 'opacity 0.3s ease-out',
    }
  }

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
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 px-4 py-2 bg-white rounded-lg shadow-md pointer-events-auto"
            style={getItemPosition(item.angle)}
          >
            {item.label}
          </div>
        ))}
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
