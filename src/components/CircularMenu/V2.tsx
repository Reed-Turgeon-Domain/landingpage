import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'

import { MathUtils } from '../../utils'
import { useMousePosition } from '../../hooks/useMousePosition'

type Point = {
    x: number
    y: number
}
type CircularMenuV2Props = {
    diameter?: number
    debug?: boolean
}
const CircularMenuV2 = ({ diameter = 400, debug = true }: CircularMenuV2Props) => {
    // REFFS
    const circleRef = useRef<HTMLDivElement>(null)

    // STATE
    const [circleCenter, setCircleCenter] = useState<Point>({ x: 0, y: 0 })
    const [viewportCenter, setViewportCenter] = useState<Point>({ x: 0, y: 0 })
    
    const [testVectorDegrees, setVectorDegrees] = useState(0)
    const testVectorRadians = MathUtils.convertDegreesToRadians(testVectorDegrees)
    
    // Use the custom hook instead of local state
    const { mousePosition, isMouseInViewport } = useMousePosition()

    // Calculate vector end point
    // const vectorLength = diameter / 2
    const vectorLength = 500
    const vectorEndPoint = {
        x: circleCenter.x + Math.cos(testVectorRadians) * vectorLength,
        y: circleCenter.y + Math.sin(testVectorRadians) * vectorLength
    }

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

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            {debug && (
                <div>
                    <div className="absolute top-0 left-0">
                        <div> 
                            {`Circle Center: ${circleCenter.x}, ${circleCenter.y}`}
                        </div>
                        <div>
                            {`Viewport Center: ${viewportCenter.x}, ${viewportCenter.y}`}
                        </div>

                        <br />

                        <div className="flex flex-col">
                            <span>{`Vector Length: ${vectorLength}`}</span>
                            <span>{`Vector Endpoint: ${vectorEndPoint.x.toFixed(2)}, ${vectorEndPoint.y.toFixed(2)}`}</span>
                        </div>

                        <br />

                        <div className="flex flex-col">
                            <span>{`Angle Radians: ${testVectorRadians}`}</span>
                            <span>{`Angle: ${testVectorDegrees}°`}</span>
                        </div>

                        <br />
                        
                        <div>
                            {`Mouse in viewport: ${isMouseInViewport}`}
                        </div>
                        <div>
                            {`Mouse Position: ${isMouseInViewport ? `${mousePosition.x}, ${mousePosition.y}` : 'Outside viewport'}`}
                        </div>
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
                    <div
                        className="fixed bg-green-500"
                        style={{
                            width: '200px',
                            height: '4px',
                            position: 'absolute',
                            left: circleCenter.x,
                            top: circleCenter.y,
                            transformOrigin: '0 50%',
                            transform: `rotate(${testVectorRadians}rad) translateY(-50%)`
                        }}
                    />
                    <div 
                        className="fixed w-[10px] h-[10px] bg-yellow-500 rounded-full"
                        style={{ 
                            left: vectorEndPoint.x,
                            top: vectorEndPoint.y,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    {isMouseInViewport && (
                        <div 
                            className="fixed w-[5px] h-[5px] bg-purple-500 rounded-full"
                            style={{ 
                                left: mousePosition.x,
                                top: mousePosition.y,
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    )}
                </div>
            )}

            <div 
                ref={circleRef}
                className="relative border-2 border-black border-dashed rounded-full"
                style={{ width: diameter, height: diameter }}
            >
                
            </div>
        </div>
    )
}

export default CircularMenuV2