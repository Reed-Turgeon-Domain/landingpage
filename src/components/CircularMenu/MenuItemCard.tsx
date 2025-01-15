import { type ComponentType, useState, useRef, useEffect } from 'react'
import cx from 'classnames'

type Point = {
    x: number
    y: number
}

// HELPERS
const calculateDistance = (p1: Point, p2: Point): number => {
    return Math.sqrt(
        Math.pow(p2.x - p1.x, 2) + 
        Math.pow(p2.y - p1.y, 2)
    )
}

type MenuItemCardProps = {
    label: string
    IconComponent?: ComponentType<{ size: number }>
    position: Point
    mousePosition: Point
    isMouseInViewport: boolean
    mouseInMenu: boolean
    syntheticPosition?: Point
    debug?: boolean
}
const MenuItemCard = ({ 
    label, 
    IconComponent,
    position,
    mousePosition,
    isMouseInViewport,
    mouseInMenu,
    syntheticPosition,
    debug = true,
}: MenuItemCardProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isMouseHovering, setIsMouseHovering] = useState(false)
    const [isSyntheticHovering, setIsSyntheticHovering] = useState(false)
    
    // Add mouse position effect to track real hovering
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

    // STATE
    const distanceToMouse = isMouseInViewport ? calculateDistance(position, mousePosition) : Infinity
    const distanceToSynthetic = isMouseInViewport ? calculateDistance(position, syntheticPosition) : Infinity
    
    // METHODS

    return (
        <div 
            ref={containerRef}
            className="flex relative border-2 border-teal-500"
            onMouseEnter={() => setIsMouseHovering(true)}
            onMouseLeave={() => setIsMouseHovering(false)}
        >
            <div 
                className={cx(
                    "flex flex-col",
                    "gap-2 px-2 py-1", 
                    "rounded-md shadow-md",
                    "transition-all duration-150",
                    {
                        "bg-white": !isMouseHovering && !isSyntheticHovering,
                        "bg-green-500": !isMouseHovering && isSyntheticHovering,
                        "bg-blue-500": isMouseHovering,
                    }
                )}
            >
                {IconComponent && <IconComponent size={20} />}
                <span className="whitespace-nowrap">{label}</span>
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