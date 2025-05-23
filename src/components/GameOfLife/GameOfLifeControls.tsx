import { useState } from 'react'
import cx from 'classnames'

interface GameOfLifeControlsProps {
  isPlaying: boolean
  speed: number
  generation: number
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
  onTogglePlay,
  onReset,
  onClear,
  onSpeedChange,
  className = ''
}: GameOfLifeControlsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className={cx(
      'z-20',
      'fixed bottom-4 left-4 z-20',
      'bg-black/80 text-white rounded-lg',
      'transition-all duration-300',
      className
    )}>
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-xs hover:bg-gray-700 rounded-lg transition-colors"
          title="Game of Life Controls"
        >
          🎮
        </button>
      ) : (
        <div className="p-3 space-y-2">
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
              <span className="font-bold">{isPlaying ? 'Running' : 'Paused'}</span>
            </div>
            
            <div className="text-xs text-white">
              Speed: 1 generation per second
            </div>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={onTogglePlay}
              className={cx(
                'px-2 py-1 text-xs rounded transition-colors',
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              )}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
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
          
          <div className="pt-1">
            <button 
              onClick={() => setShowDebug(!showDebug)}
              className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors w-full"
            >
              {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
            </button>
            
            {showDebug && (
              <div className="mt-2 text-xs text-gray-300 bg-gray-800 p-2 rounded">
                <p>Current generation: {generation}</p>
                <p>Playing: {isPlaying ? 'Yes' : 'No'}</p>
                <p>Speed: {speed}ms</p>
                <p>Status: {isPlaying ? 'Running' : 'Paused'}</p>
                <p className="mt-1">Click anywhere on the screen to toggle cells</p>
                <p>Press SPACE to play/pause</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 