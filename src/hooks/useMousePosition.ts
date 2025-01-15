import { useState, useEffect } from 'react'
import { type Point } from '../types/index'

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState<Point | null>(null)
    const [mouseInViewport, setIsMouseInViewport] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
            setIsMouseInViewport(true)
        }

        const handleMouseLeave = () => {
            setIsMouseInViewport(false)
            setMousePosition(null)
        }

        const handleMouseEnter = (e: MouseEvent) => {
            setIsMouseInViewport(true)
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        // Initialize only with actual mouse movement
        window.addEventListener('mousemove', handleMouseMove)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [])

    return { mousePosition, mouseInViewport }
} 