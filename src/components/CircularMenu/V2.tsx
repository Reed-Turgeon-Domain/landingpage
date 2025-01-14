import { useState, useEffect, useRef } from 'react'
import cx from 'classnames'

type CircularMenuV2Props = {
    diameter?: number
}
const CircularMenuV2 = ({ diameter = 400 }: CircularMenuV2Props) => {
    // REFFS
    const circleRef = useRef<HTMLDivElement>(null)

    // STATE

    // MODELS

    // USE EFFECTS

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
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