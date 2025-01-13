import { useState, useEffect, useRef } from 'react'
import { FaGithub } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa";


type Point = {
  x: number
  y: number
}

type MenuItem = {
  label: string
  angle: number
  href?: string
  icon?: React.ReactNode
}

function CircularMenu() {
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 })
  const [angle, setAngle] = useState(0)
  const [activeLink, setActiveLink] = useState('')
  const circleRef = useRef<HTMLDivElement>(null)

  const menuItems: MenuItem[] = [
    { label: "Learn Like Me", 
      angle: -Math.PI / 4, 
      href: "https://llm.reedturgeon.com" },
    { label: "LinkedIn", 
      angle: Math.PI / 4, 
      href: "https://www.linkedin.com/in/reedturgeon" , 
      icon: <div style={{ marginTop: '1px' }}>
        <FaLinkedin size={25} />
      </div>},
    { label: "GitHub", 
      angle: 3 * Math.PI / 4, 
      href: "https://github.com/MrT3313", 
      icon: <div style={{ marginTop: '1px' }}>
        <FaGithub size={25}/>
      </div> },
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

  useEffect(() => {
    const handleHover = (e: CustomEvent) => {
      setActiveLink(e.detail);
    };

    window.addEventListener('linkHover', handleHover as EventListener);
    return () => window.removeEventListener('linkHover', handleHover as EventListener);
  }, []);

  const getItemVisibility = (itemAngle: number, label: string) => {
    if (activeLink && activeLink === label) {
      return 1;
    }
    
    const angleDiff = Math.abs(normalizeAngle(angle - itemAngle))
    const threshold = Math.PI / 4
    const opacity = Math.max(0, 1 - (angleDiff / threshold))
    return opacity
  }

  const normalizeAngle = (angle: number): number => {
    while (angle < -Math.PI) angle += 2 * Math.PI
    while (angle > Math.PI) angle -= 2 * Math.PI
    return angle
  }

  const getItemPosition = (itemAngle: number, label: string) => {
    if (!circleRef.current) return { left: '50%', top: '50%' }

    const rect = circleRef.current.getBoundingClientRect()
    const radius = rect.width / 2 - 20
    const x = radius * Math.cos(itemAngle)
    const y = radius * Math.sin(itemAngle)
    const opacity = getItemVisibility(itemAngle, label)

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

  const getItemStyle = (item: MenuItem) => {
    const baseStyle = getItemPosition(item.angle, item.label)
    if (item.label === "Learn Like Me") {
      return {
        ...baseStyle,
        backgroundColor: '#6464F0',
        color: 'white',
      }
    }
    if (item.label === "LinkedIn") {
      return {
        ...baseStyle,
        backgroundColor: '#0077b5',
        color: 'white',
      }
    }
    if (item.label === "GitHub") {
      return {
        ...baseStyle,
        backgroundColor: '#171515',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }
    }
    return baseStyle
  }

  const shouldShowBall = () => {
    if (!activeLink) return true
    
    // Check if any menu item is visible when there's an active link
    return !menuItems.some(item => 
      item.label === activeLink && getItemVisibility(item.angle, item.label) > 0
    )
  }

  const version = `V1.1-Icons`

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div 
        ref={circleRef}
        className="relative w-[400px] h-[400px] border-2 border-black border-dashed rounded-full"
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 px-2 py-1 rounded-lg shadow-md pointer-events-auto"
            style={getItemStyle(item)}
          >
            {item.href ? (
              <a 
                href={item.href} 
                className="no-underline hover:opacity-80 flex items-center gap-2" 
                style={{ color: 'inherit' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item?.icon ? item.icon : item.label}
              </a>
            ) : (
              item.label
            )}
          </div>
        ))}
        {shouldShowBall() && (
          <div 
            className="fixed w-4 h-4 bg-orange-500/80 rounded-full"
            style={getBallPosition()}
          />
        )}
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
