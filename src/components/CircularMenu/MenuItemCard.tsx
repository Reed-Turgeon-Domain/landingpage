import React, { type ComponentType, useState, useRef, useEffect } from 'react'
import { FaGithub, FaLinkedin } from "react-icons/fa"
import cx from 'classnames'

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
    isMouseInViewport: boolean
    mouseInMenu: boolean
    syntheticPosition?: Point
    debug?: boolean
}
const MenuItemCard = ({ 
    item,
    position,
    mousePosition,
    isMouseInViewport,
    mouseInMenu,
    syntheticPosition,
    debug = true,
}: MenuItemCardProps) => {
    // REFS
    const containerRef = useRef<HTMLDivElement>(null)

    // STATE
    // STATE > mouse
    const [isMouseHovering, setIsMouseHovering] = useState(false)
    const distanceToMouse = isMouseInViewport ? calculateDistance(position, mousePosition) : Infinity
    // STATE > synthetic
    const [isSyntheticHovering, setIsSyntheticHovering] = useState(false)
    const distanceToSynthetic = isMouseInViewport && syntheticPosition 
        ? calculateDistance(position, syntheticPosition) 
        : Infinity
    
    const EFFECT_DISTANCE = 235
    const opacity = syntheticPosition 
        ? Math.max(0, Math.min(1, 1 - (distanceToSynthetic / EFFECT_DISTANCE)))
        : 0

    // METHODS

    // USE EFFECTS
    useEffect(() => {
        if (!containerRef.current || !isMouseInViewport) return
        
        const rect = containerRef.current.getBoundingClientRect()
        const isHovering = 
            mousePosition.x >= rect.left &&
            mousePosition.x <= rect.right &&
            mousePosition.y >= rect.top &&
            mousePosition.y <= rect.bottom
        
        setIsMouseHovering(isHovering)
    }, [mousePosition, isMouseInViewport])
    
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

    const renderIcon = (iconType: "github" | "linkedin") => {
        switch (iconType) {
            case "github":
                return <div style={{ marginTop: '1px' }}><FaGithub size={24} /></div>
            case "linkedin":
                return <div style={{ marginTop: '1px' }}><FaLinkedin size={24} /></div>
        }
    }

    return (
        <div 
            ref={containerRef}
            className="flex relative"
            onMouseEnter={() => setIsMouseHovering(true)}
            onMouseLeave={() => setIsMouseHovering(false)}
            style={{ opacity: isMouseHovering ? 1 : opacity }}
        >
            <div 
                className={cx(
                    "flex flex-col items-center justify-center",
                    "gap-2 px-2 py-1", 
                    "rounded-md shadow-md",
                    "transition-all duration-150",
                    {
                        "bg-white": !isMouseHovering && !isSyntheticHovering,
                        "bg-green-500": !isMouseHovering && isSyntheticHovering,
                        "bg-blue-500": isMouseHovering,
                    }
                )}
                style={item?.hex ? { backgroundColor: `#${item.hex}` } : undefined}
            >
                {item.href ? (
                    <a 
                        href={item.href}
                        className="no-underline hover:opacity-80 flex items-center gap-2"
                        style={{ color: 'inherit' }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.iconType ? renderIcon(item.iconType) : item.label}
                    </a>
                ) : (
                    item.label
                )}
            </div>
            
            {debug && (
                <div className="absolute -bottom-32 w-[300px] left-0 text-xs text-gray-500">
                    <div>pos: {position.x.toFixed(0)}, {position.y.toFixed(0)}</div>
                    {isMouseInViewport && (
                        <>
                            <div>mouse: {mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)}</div>
                            <div>dist to mouse: {distanceToMouse.toFixed(0)}px</div>
                            <div>mouse hover: {isMouseHovering ? "true" : "false"}</div>
                            {syntheticPosition && (
                                <>  
                                    <div>synthetic: {syntheticPosition?.x.toFixed(0)}, {syntheticPosition?.y.toFixed(0)}</div>
                                    <div>dist to synthetic: {distanceToSynthetic.toFixed(0)}px</div>
                                    <div>synthetic hover: {isSyntheticHovering ? "true" : "false"}</div>
                                </>
                            )}
                        </>
                    )}
                    <div>hover: {isMouseHovering ? "mouse" : isSyntheticHovering ? "synthetic" : "none"}</div>
                </div>
            )}
        </div>
    )
}

export default MenuItemCard 