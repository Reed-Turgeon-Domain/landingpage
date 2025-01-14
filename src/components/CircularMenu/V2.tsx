import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'

import { MathUtils } from '../../utils'
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
    const testVectorLength = 200
    const [angleDegrees, setAngleDegrees] = useState(0)
    const angleRadians = MathUtils.convertDegreesToRadians(angleDegrees)

    // Calculate vector end point
    const vectorEndPoint = {
        x: circleCenter.x + Math.cos(angleRadians) * testVectorLength,
        y: circleCenter.y + Math.sin(angleRadians) * testVectorLength
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
                            <span>{`Angle Radians: ${angleRadians}`}</span>
                            <span>{`Angle: ${angleDegrees}°`}</span>
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
                            transform: `rotate(${angleRadians}rad) translateY(-50%)`
                        }}
                    />
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