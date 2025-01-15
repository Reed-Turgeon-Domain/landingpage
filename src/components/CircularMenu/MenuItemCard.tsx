import { type ComponentType, useState } from 'react'
import cx from 'classnames'

type Point = {
    x: number
    y: number
}

type MenuItemCardProps = {
    label: string
    IconComponent?: ComponentType<{ size: number }>
    position: Point
    mousePosition: Point
    isMouseInViewport: boolean
    debug?: boolean
}

const MenuItemCard = ({ 
    label, 
    IconComponent,
    position,
    mousePosition,
    isMouseInViewport,
    debug = true,
}: MenuItemCardProps) => {
    const calculateDistance = (p1: Point, p2: Point): number => {
        return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + 
            Math.pow(p2.y - p1.y, 2)
        )
    }

    const distance = isMouseInViewport ? calculateDistance(position, mousePosition) : Infinity

    return (
        <div className="flex relative border-2 border-teal-500">
            <div 
                className={cx(
                    "flex flex-col",
                    "gap-2 px-2 py-1", 
                    "bg-white rounded-md shadow-md",
                    "bg-orange-500",
                    "transition-opacity duration-150",
                )}
                style={{ }}
            >
                {IconComponent && <IconComponent size={20} />}
                <span className="whitespace-nowrap">{label}</span>
            </div>
            
            {debug && (
                <div className="absolute -bottom-16 w-[300px] left-0 text-xs text-gray-500">
                    <div>pos: {position.x.toFixed(0)}, {position.y.toFixed(0)}</div>
                    <div>mouse: {mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)}</div>
                    <div>dist: {distance.toFixed(0)}px</div>
                </div>
            )}
        </div>
    )
}

export default MenuItemCard 