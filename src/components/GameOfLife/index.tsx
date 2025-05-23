import { useEffect, useState, useRef } from 'react'
import cx from 'classnames'
import type { GameGrid, GameOfLifeConfig } from './types'
import { 
  createEmptyGrid, 
  createRandomGrid, 
  getNextGeneration, 
  toggleCell, 
  clearGrid,
  getGridDimensions 
} from './gameLogic'

interface GameOfLifeProps {
  className?: string
}

// Game of Life component with direct imperative code
const GameOfLife = ({ className = '' }: GameOfLifeProps) => {
  // Component state
  const [grid, setGrid] = useState<GameGrid>(createEmptyGrid(1, 1));
  const [generation, setGeneration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Start with game playing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Configuration (fixed)
  const cellSize = 20;
  const initialDensity = 0.12;
  
  // Initialize only once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    console.log("GameOfLife: Initial setup");
    
    // Get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Set up initial grid
    const dims = getGridDimensions(width, height, cellSize);
    const initialGrid = createRandomGrid(dims.width, dims.height, initialDensity);
    setGrid(initialGrid);
    
    // Reset generation
    setGeneration(0);
    
    // Set up canvas size
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = dims.width * cellSize;
      canvas.height = dims.height * cellSize;
      drawGrid(canvas, initialGrid, cellSize, 0);
    }
    
    // Setup resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const newDims = getGridDimensions(newWidth, newHeight, cellSize);
      const newGrid = createRandomGrid(newDims.width, newDims.height, initialDensity);
      
      setGrid(newGrid);
      setGeneration(0);
      
      if (canvas) {
        canvas.width = newDims.width * cellSize;
        canvas.height = newDims.height * cellSize;
        drawGrid(canvas, newGrid, cellSize, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  
  // Draw grid on canvas
  const drawGrid = (canvas: HTMLCanvasElement, gridData: GameGrid, size: number, gen: number) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw cells
    let aliveCount = 0;
    
    for (let y = 0; y < gridData.height; y++) {
      for (let x = 0; x < gridData.width; x++) {
        if (gridData.cells[y][x]) {
          aliveCount++;
          
          // Use the cell's color if available, otherwise default to white
          if (gridData.cellColors && gridData.cellColors[y][x]) {
            ctx.fillStyle = gridData.cellColors[y][x];
          } else {
            ctx.fillStyle = '#ffffff';
          }
          
          ctx.fillRect(x * size, y * size, size, size);
        }
      }
    }
    
    console.log(`Generation ${gen}: Rendered ${aliveCount} alive cells`);
  };
  
  // Process next generation - core game logic
  const nextGeneration = () => {
    // Log current state
    console.log(`Processing generation ${generation} -> ${generation + 1}`);
    
    // Get the current grid
    const currentGen = generation;
    const currentGrid = grid;
    
    // Calculate the next generation grid
    const nextGrid = getNextGeneration(currentGrid);
    
    // Count alive cells for logging
    let beforeCount = 0;
    let afterCount = 0;
    
    for (let y = 0; y < currentGrid.height; y++) {
      for (let x = 0; x < currentGrid.width; x++) {
        if (currentGrid.cells[y][x]) beforeCount++;
        if (nextGrid.cells[y][x]) afterCount++;
      }
    }
    
    console.log(`Cells: ${beforeCount} -> ${afterCount}`);
    
    // Update state with new generation
    setGeneration(currentGen + 1);
    setGrid(nextGrid);
    
    // Draw the new grid
    const canvas = canvasRef.current;
    if (canvas) {
      drawGrid(canvas, nextGrid, cellSize, currentGen + 1);
    }
  };
  
  // Handle the game loop with setInterval
  useEffect(() => {
    // Start/stop the game loop based on isPlaying state
    if (isPlaying) {
      console.log("Starting game interval with 1 second delay");
      
      // Clear any existing interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Create new interval that fires every second
      timerRef.current = setInterval(() => {
        console.log("Interval fired, advancing generation");
        nextGeneration();
      }, 1000);
      
      // Cleanup function
      return () => {
        console.log("Cleaning up interval");
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      // Stop the interval if game is paused
      console.log("Game paused, clearing interval");
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isPlaying, grid]); // Include grid to ensure we always use the latest grid state
  
  // Toggle play/pause
  const togglePlay = () => {
    console.log(`Toggling play state: ${!isPlaying}`);
    setIsPlaying(!isPlaying);
  };
  
  // Step forward one generation manually
  const stepForward = () => {
    console.log("Manually stepping forward one generation");
    nextGeneration();
  };
  
  // Reset grid to random state
  const resetGrid = () => {
    // Stop loop if running
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Create new random grid
    const dims = getGridDimensions(window.innerWidth, window.innerHeight, cellSize);
    const newGrid = createRandomGrid(dims.width, dims.height, initialDensity);
    
    // Reset state
    setGrid(newGrid);
    setGeneration(0);
    
    // Update canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = dims.width * cellSize;
      canvas.height = dims.height * cellSize;
      drawGrid(canvas, newGrid, cellSize, 0);
    }
    
    console.log("Grid reset to generation #0");
  };
  
  // Clear all cells
  const clearAllCells = () => {
    // Stop loop if running
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Clear grid
    const clearedGrid = clearGrid(grid);
    
    // Reset state
    setGrid(clearedGrid);
    setGeneration(0);
    
    // Update canvas
    const canvas = canvasRef.current;
    if (canvas) {
      drawGrid(canvas, clearedGrid, cellSize, 0);
    }
    
    console.log("Grid cleared to generation #0");
  };
  
  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    
    console.log(`Toggling cell at ${x},${y}`);
    
    // Toggle cell and update grid
    const newGrid = toggleCell(grid, x, y);
    setGrid(newGrid);
    
    // Redraw
    drawGrid(canvas, newGrid, cellSize, generation);
  };
  
  // Space key handler
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        togglePlay();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  return (
    <div className={cx('fixed inset-0 z-0', 'pointer-events-none', className)}>
      {/* Controls at the top of the screen with higher z-index */}
      <div className={cx(
        'fixed top-4 right-4 z-50', // Positioned at top-right with high z-index
        'bg-black/80 text-white rounded-lg',
        'transition-all duration-300',
        'pointer-events-auto'
      )}>
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Game of Life</span>
            <span className="text-xs font-bold">Gen: {generation}</span>
          </div>
          
          <div className="flex gap-1">
            <button
              onClick={togglePlay}
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
              onClick={resetGrid}
              className="px-2 py-1 text-xs bg-[#4a90e2] hover:bg-blue-600 rounded transition-colors"
            >
              🔄 Reset
            </button>
            
            <button
              onClick={clearAllCells}
              className="px-2 py-1 text-xs bg-gray-600 hover:bg-gray-700 rounded transition-colors"
            >
              🗑️ Clear
            </button>
            
            <button
              onClick={stepForward}
              className="px-2 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 rounded transition-colors"
            >
              ⏭️
            </button>
          </div>
        </div>
      </div>
      
      {/* Game canvas */}
      <div className="pointer-events-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onClick={handleCanvasClick}
          style={{
            display: 'block',
            imageRendering: 'pixelated',
            backgroundColor: 'black'
          }}
        />
      </div>
    </div>
  );
};

export default GameOfLife;