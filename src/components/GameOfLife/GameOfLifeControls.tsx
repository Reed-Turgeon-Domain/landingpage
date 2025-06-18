import { useState } from 'react'
import cx from 'classnames'

interface GameOfLifeControlsProps {
  isPlaying: boolean
  speed: number
  generation: number
  isGameOver: boolean
  onTogglePlay: () => void
  onReset: () => void
  onClear: () => void
  onSpeedChange: (speed: number) => void
  className?: string
}

export const GameOfLifeControls = ({
  isPlaying,
  speed,
  generation,
  isGameOver,
  onTogglePlay,
  onReset,
  onClear,
  onSpeedChange,
  className,
}: GameOfLifeControlsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className={cx(
      'fixed bottom-4 left-4',
      'text-white rounded-lg',
      'transition-all duration-300',
      className,
    )}>
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-xs rounded-lg transition-colors bg-teal-500"
          title="Game of Life Controls"
        >
          🎮
        </button>
      ) : (
        <div className="p-3 space-y-2 bg-teal-500/70 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Game of Life</span>
            <button
              onClick={() => setIsCollapsed(true)}
              className="text-xs hover:bg-gray-700 p-1 rounded transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col gap-1">
            <div className="text-xs text-white flex justify-between">
              <span>Generation:</span>
              <span className="font-bold">{generation}</span>
            </div>
            
            <div className="text-xs text-white flex justify-between">
              <span>Status:</span>
              <span className="font-bold">
                {isGameOver ? 'GAME OVER' : isPlaying ? 'Running' : 'Paused'}
              </span>
            </div>
            
            <div className="text-xs text-white">
              Speed: 1 generation per second
            </div>
            
            {isGameOver && (
              <div className="text-sm text-white font-bold bg-red-700 p-2 rounded-md text-center mt-1">
                GAME OVER
              </div>
            )}
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={onTogglePlay}
              className={cx(
                'px-2 py-1 text-xs rounded transition-colors',
                isGameOver
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : isPlaying 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
              )}
            >
              {isGameOver ? '🎮 New Game' : isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            
            <button
              onClick={onReset}
              className="px-2 py-1 text-xs bg-[#4a90e2] hover:bg-blue-600 rounded transition-colors"
            >
              🔄 Reset
            </button>
            
            <button
              onClick={onClear}
              className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 