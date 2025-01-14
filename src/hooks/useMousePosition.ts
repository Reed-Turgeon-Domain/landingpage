import { useState, useEffect } from 'react'

type Point = {
    x: number
    y: number
}

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 })
    const [isMouseInViewport, setIsMouseInViewport] = useState(true)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseLeave = () => {
            setIsMouseInViewport(false)
        }

        const handleMouseEnter = () => {
            setIsMouseInViewport(true)
        }

        window.addEventListener('mousemove', handleMouseMove)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    return { mousePosition, isMouseInViewport }
} 