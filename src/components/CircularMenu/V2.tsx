import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'

import { MathUtils } from '../../utils'
import { useMousePosition } from '../../hooks/useMousePosition'
import { menuItems } from '../../constants/menuItems'
import MenuItemCard from './MenuItemCard'

type Point = {
    x: number
    y: number
}
type CircularMenuV2Props = {
    menuItems: MenuItemType[]
    diameter?: number
    total_segments?: number
    debug?: boolean
}

type MenuItemType = {
    label: string
    segments: number[]
    href?: string
    IconComponent?: React.ComponentType<{ size: number }>
}

const CircularMenuV2 = ({ 
    menuItems,
    diameter = 400, 
    total_segments = 20,
    debug = true }: CircularMenuV2Props) => {
    console.log(menuItems[0])
    // REFFS
    const circleRef = useRef<SVGSVGElement>(null)

    // STATE
    const [circleCenter, setCircleCenter] = useState<Point>({ x: 0, y: 0 })
    const [viewportCenter, setViewportCenter] = useState<Point>({ x: 0, y: 0 })
    
    
    // Use the custom hook instead of local state
    const { mousePosition, isMouseInViewport } = useMousePosition()

    // MODELS

    // USE EFFECTS
    useEffect(() => {
        const updateCenters = () => {
            // Update circle center
            if (circleRef.current) {
                const rect = circleRef.current.getBoundingClientRect()
                setCircleCenter({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                })
            }
            
            // Update viewport center
            setViewportCenter({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            })
        }

        updateCenters()
        window.addEventListener('resize', updateCenters)
        return () => window.removeEventListener('resize', updateCenters)
    }, [])

    const generateSegmentPath = (
        index: number
    ): string => {
        const radius = diameter / 2
        const anglePerSegment = (2 * Math.PI) / total_segments
        const startAngle = index * anglePerSegment
        const endAngle = (index + 1) * anglePerSegment

        const startX = radius + radius * Math.cos(startAngle)
        const startY = radius + radius * Math.sin(startAngle)
        const endX = radius + radius * Math.cos(endAngle)
        const endY = radius + radius * Math.sin(endAngle)

        const largeArcFlag = 0 // Use 0 for segments less than 180 degrees
        
        return `M ${radius},${radius} L ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag} 1 ${endX},${endY} Z`
    }

    const getSegmentCenter = (index: number): Point => {
        const radius = diameter / 2
        const anglePerSegment = (2 * Math.PI) / total_segments
        const angle = (index + 0.5) * anglePerSegment
        
        return {
            x: radius + (radius * 0.6) * Math.cos(angle),
            y: radius + (radius * 0.6) * Math.sin(angle)
        }
    }

    const getSegmentEdgePosition = (index: number): Point => {
        const radius = diameter / 2
        const anglePerSegment = (2 * Math.PI) / total_segments
        const angle = (index + 0.5) * anglePerSegment
        
        return {
            x: radius + radius * Math.cos(angle),
            y: radius + radius * Math.sin(angle)
        }
    }

    const getMultiSegmentEdgePosition = (segments: number[]): Point => {
        const radius = diameter / 2
        const anglePerSegment = (2 * Math.PI) / total_segments
        
        // Get the middle angle between first and last segment
        const startAngle = segments[0] * anglePerSegment
        const endAngle = (segments[segments.length - 1] + 1) * anglePerSegment
        const middleAngle = startAngle + (endAngle - startAngle) / 2
        
        return {
            x: radius + radius * Math.cos(middleAngle),
            y: radius + radius * Math.sin(middleAngle)
        }
    }

    const calculateVectorDegree = (start: Point, end: Point): number => {
        const radians = Math.atan2(end.y - start.y, end.x - start.x)
        // Convert radians to degrees and normalize to 0-360 range
        let degrees = (radians * 180) / Math.PI
        degrees = degrees < 0 ? degrees + 360 : degrees
        return Number(degrees.toFixed(2))
    }

    const getAbsolutePosition = (svgX: number, svgY: number): Point => {
        if (!circleRef.current) return { x: 0, y: 0 }
        
        const svgRect = circleRef.current.getBoundingClientRect()
        return {
            x: svgRect.left + svgX,
            y: svgRect.top + svgY
        }
    }

    return (
        <div className={cx("border-2 border-teal-500 fixed inset-0 flex items-center justify-center pointer-events-none")}>
            {debug && (
                <div>
                    <div className="absolute top-0 right-0">
                        <div> 
                            {`Circle Center: ${circleCenter.x}, ${circleCenter.y}`}
                        </div>
                        <div>
                            {`Viewport Center: ${viewportCenter.x}, ${viewportCenter.y}`}
                        </div>

                        <br />
                        
                        <div>
                            {`Mouse in viewport: ${isMouseInViewport}`}
                        </div>
                        <div>
                            {`Mouse Position: ${isMouseInViewport ? `${mousePosition.x}, ${mousePosition.y}` : 'Outside viewport'}`}
                        </div>

                        {isMouseInViewport && (
                            <>
                                <br />
                                <div>
                                    {`Vector Degree: ${calculateVectorDegree(circleCenter, mousePosition)}°`}
                                </div>
                                <div>
                                    {`Vector Start: ${circleCenter.x}, ${circleCenter.y}`}
                                </div>
                                <div>
                                    {`Vector End: ${mousePosition.x}, ${mousePosition.y}`}
                                </div>
                                <div>
                                    {`Vector Length: ${Math.sqrt(
                                        Math.pow(mousePosition.x - circleCenter.x, 2) + 
                                        Math.pow(mousePosition.y - circleCenter.y, 2)
                                    ).toFixed(2)}px`}
                                </div>
                            </>
                        )}
                    </div>
                    
                    <div 
                        className="absolute w-[5px] h-[5px] bg-red-500 rounded-full"
                        style={{ 
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    <div 
                        className="fixed w-[5px] h-[5px] bg-blue-500 rounded-full"
                        style={{ 
                            left: viewportCenter.x,
                            top: viewportCenter.y,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    {isMouseInViewport && (
                        <>
                            <div 
                                className="fixed w-[5px] h-[5px] bg-purple-500 rounded-full"
                                style={{ 
                                    left: mousePosition.x,
                                    top: mousePosition.y,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                            <div 
                                className="fixed bg-green-500"
                                style={{
                                    width: '4px',
                                    position: 'fixed',
                                    left: circleCenter.x,
                                    top: circleCenter.y,
                                    height: Math.sqrt(
                                        Math.pow(mousePosition.x - circleCenter.x, 2) + 
                                        Math.pow(mousePosition.y - circleCenter.y, 2)
                                    ),
                                    transform: `rotate(${Math.atan2(
                                        mousePosition.y - circleCenter.y,
                                        mousePosition.x - circleCenter.x
                                    ) - Math.PI/2}rad)`,
                                    transformOrigin: '0 0'
                                }}
                            />
                        </>
                    )}
                </div>
            )}

            <svg 
                ref={circleRef}
                width={diameter}
                height={diameter}
                className="relative border-red-500 border-2"
                style={{ overflow: 'visible' }}
            >
                {Array.from({ length: total_segments }, (_, index) => (
                    <g key={index}>
                        <path
                            d={generateSegmentPath(index)}
                            className="stroke-black fill-transparent"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                        />
                        {menuItems.map((item) => {
                            const svgX = item.segments.length > 1 
                                ? getMultiSegmentEdgePosition(item.segments).x - 75
                                : getSegmentEdgePosition(index).x - 75;
                            const svgY = item.segments.length > 1
                                ? getMultiSegmentEdgePosition(item.segments).y - 25
                                : getSegmentEdgePosition(index).y - 25;
                                
                            const absolutePosition = getAbsolutePosition(svgX + 75, svgY + 25)

                            return item.segments?.includes(index) && 
                                item.segments[0] === index && (
                                    <foreignObject
                                        key={`item-${item.label}-${index}`}
                                        x={svgX}
                                        y={svgY}
                                        width="150"
                                        height="50"
                                        style={{ overflow: 'visible' }}
                                    >
                                        <div className="flex items-center justify-center w-full h-full">
                                            <MenuItemCard
                                                label={item.label}
                                                IconComponent={item.IconComponent}
                                                position={absolutePosition}
                                                mousePosition={mousePosition}
                                                isMouseInViewport={isMouseInViewport}
                                            />
                                        </div>
                                    </foreignObject>
                                )
                        })}
                        {debug && (
                            <text
                                x={getSegmentCenter(index).x}
                                y={getSegmentCenter(index).y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm fill-black pointer-events-none"
                            >
                                {index}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    )
}

export default CircularMenuV2