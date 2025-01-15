import { type ReactNode } from 'react'
import cx from 'classnames'

type InteractionModalityProps = {
  mode: 'touch' | 'mouse'
}

const InteractionModality = ({ mode }: InteractionModalityProps) => {
  return (
    <div className="fixed bottom-2 left-2 px-3 py-1.5 bg-black/80 text-white rounded-lg text-xs">
      {mode === 'touch' ? '👆 Touch : For best experience, use a 🖱️ Mouse' : '🖱️ Mouse'}
    </div>
  )
}

export default InteractionModality 