import React, { type ComponentType, useState, useRef, useEffect } from 'react'
import cx from 'classnames'

// ICONS
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md";

// TYPES
import { type MenuItemType, type Point } from '../../types'

// HELPERS
const calculateDistance = (p1: Point, p2: Point): number => {
    return Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + 
        Math.pow(p2.y - p1.y, 2)
    )
}

type MenuItemCardProps = {
    item: MenuItemType
    position: Point
    mousePosition: Point
    mouseInViewport: boolean
    mouseInMenu: boolean
    syntheticPosition?: Point
    debug?: boolean
    interactionModality: 'touch' | 'mouse'
    onHover?: (isHovering: boolean) => void
}
const MenuItemCard = ({ 
    item,
    position,
    mousePosition,
    mouseInViewport,
    mouseInMenu,
    syntheticPosition,
    debug = false,
    interactionModality,
    onHover
}: MenuItemCardProps) => {
    // REFS
    const containerRef = useRef<HTMLDivElement>(null)

    // STATE
    // STATE > mouse
    const [isMouseHovering, setIsMouseHovering] = useState(false)
    const distanceToMouse = mouseInViewport ? calculateDistance(position, mousePosition) : Infinity
    // STATE > synthetic
    const [isSyntheticHovering, setIsSyntheticHovering] = useState(false)
    const distanceToSynthetic = mouseInViewport && syntheticPosition 
        ? calculateDistance(position, syntheticPosition) 
        : Infinity
    
    const EFFECT_DISTANCE = 235
    const opacity = syntheticPosition 
        ? Math.max(0, Math.min(1, 1 - (distanceToSynthetic / EFFECT_DISTANCE)))
        : 0

    // METHODS

    // USE EFFECTS
    useEffect(() => {
        if (!containerRef.current || !mouseInViewport) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const isHovering = 
            mousePosition.x >= rect.left &&
            mousePosition.x <= rect.right &&
            mousePosition.y >= rect.top &&
            mousePosition.y <= rect.bottom
        
        setIsMouseHovering(isHovering)
    }, [mousePosition, mouseInViewport])
    
    useEffect(() => {
        if (!syntheticPosition || !containerRef.current || isMouseHovering) {
            setIsSyntheticHovering(false)
            return
        }
        
        const rect = containerRef.current.getBoundingClientRect()
        const isColliding = 
            syntheticPosition.x >= rect.left &&
            syntheticPosition.x <= rect.right &&
            syntheticPosition.y >= rect.top &&
            syntheticPosition.y <= rect.bottom
        
        setIsSyntheticHovering(isColliding)
    }, [syntheticPosition, isMouseHovering])

    return (
        <div 
            ref={containerRef}
            className="flex relative"
            onMouseEnter={() => {
                setIsMouseHovering(true)
                if (onHover) onHover(true)
            }}
            onMouseLeave={() => {
                setIsMouseHovering(false)
                if (onHover) onHover(false)
            }}
            style={{ opacity: interactionModality === 'touch' ? 1 : (isMouseHovering ? 1 : opacity) }}
        >
            <div 
                style={{ 
                    backgroundColor: item?.hex ? `#${item.hex}` : 'white',
                    color: item?.hex && 'white',
                    opacity: interactionModality === 'touch' ? 1 : (isMouseHovering ? 1 : opacity)
                }}
                className={cx(
                    "flex flex-col items-center justify-center",
                    "gap-2 px-2 py-1", 
                    "rounded-md shadow-md",
                    "transition-all duration-150",
                    "pointer-events-auto",
                    {
                        "cursor-pointer": item.href,
                    }
                )}
            >
                {item.href ? (
                    <Item {...{ item }} />
                ) : (
                    <span className="text-nowrap">
                        {item.label}
                    </span>
                )}
            </div>
        </div>
    )
}

export const Item = ({ item }: {item: MenuItemType}) => {
    const renderIcon = (iconType: "github" | "linkedin" | "email") => {
        // TODO: BUG (icon rendering) - 👀 this is driving me up a wall
        //                  why cant I just have an Icon: <FaGithub size={24} /> in the const menuItems array 
        //                  and render <Icon /> or <item.Icon/>?
        const iconProps = { 
            size: 24,
        }
        
        switch (iconType) {
            case "github":
                return <FaGithub {...iconProps} />
            case "linkedin":
                return <FaLinkedin {...iconProps} />
            case "email":
                return <MdAlternateEmail {...iconProps} />
        }
    }
    return (
        <a 
            href={item.href}
            className={cx(
                "no-underline hover:opacity-80",
                "flex items-center gap-2",
                "pointer-events-auto",
                "cursor-pointer"
            )}
            target="_blank"
            rel="noopener noreferrer"
        >
            {item.iconType ? renderIcon(item.iconType) : item.label}
        </a>
    )
}

export default MenuItemCard 