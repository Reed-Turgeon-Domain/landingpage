import { type ReactNode } from 'react'
import cx from 'classnames'
import { useState, useEffect } from 'react'
import { useDeviceDetection } from '../hooks/useDeviceDetection'

const InteractionModality = () => {
  const [interactionModality, setInteractionModality] = useState<'touch' | 'mouse'>('mouse')
  const { isTouchOnly, isMouseOnly } = useDeviceDetection()

  useEffect(() => {
    if (isTouchOnly) setInteractionModality('touch')
    else if (isMouseOnly) setInteractionModality('mouse')
    else setInteractionModality('mouse')

    // Set data attribute and trigger viewport update
    document.body.setAttribute('data-interaction-modality', interactionModality)
    window.dispatchEvent(new Event('resize'))
  }, [isTouchOnly, isMouseOnly, interactionModality])

  return (
    <div>
      <h3 className="font-bold mb-2">Interaction</h3>
      <div className="px-2 py-1 rounded bg-black/40 whitespace-nowrap">
        {interactionModality === 'touch' 
          ? '👆 Touch' 
          : '🖱️ Mouse'
        }
      </div>
    </div>
  )
}

export default InteractionModality 