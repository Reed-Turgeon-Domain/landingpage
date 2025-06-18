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
import { GameOfLifeControls } from './GameOfLifeControls'

// Helper function to check if two game grids are identical
const areGridsEqual = (gridA: GameGrid, gridB: GameGrid): boolean => {
  if (gridA.width !== gridB.width || gridA.height !== gridB.height) {
    return false;
  }
  
  for (let y = 0; y < gridA.height; y++) {
    for (let x = 0; x < gridA.width; x++) {
      if (gridA.cells[y][x] !== gridB.cells[y][x]) {
        return false;
      }
    }
  }
  
  return true;
};

interface GameOfLifeProps {
  className?: string
  zIndex?: string
}

// Game of Life component with direct imperative code
export const GameOfLife = ({ zIndex = 'z-0' }: GameOfLifeProps) => {
  // Component state
  const [grid, setGrid] = useState<GameGrid>(createEmptyGrid(1, 1));
  const [generation, setGeneration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Start with game playing
  const [speed, setSpeed] = useState(1000); // Speed in milliseconds
  const [isGameOver, setIsGameOver] = useState(false); // Track game over state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Configuration (fixed)
  const cellSize = 20;
  const initialDensity = 0.25;
  
  // Initialize only once
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Set up initial grid
    const dims = getGridDimensions(width, height, cellSize);
    const initialGrid = createRandomGrid(dims.width, dims.height, initialDensity);
    setGrid(initialGrid);
    
    // Reset generation
    setGeneration(0);
    setIsGameOver(false);
    
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
      setIsGameOver(false);
      
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
  };
  
  // Process next generation - core game logic
  const nextGeneration = () => {
    // Get the current grid
    const currentGen = generation;
    const currentGrid = grid;
    
    // Calculate the next generation grid
    const nextGrid = getNextGeneration(currentGrid);
    
    // Check if the grid has reached a stable state
    const gameHasEnded = areGridsEqual(currentGrid, nextGrid);
    
    if (gameHasEnded) {
      setIsGameOver(true);
      setIsPlaying(false);
      
      // Stop the game loop
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    // Count alive cells for logging
    let beforeCount = 0;
    let afterCount = 0;
    
    for (let y = 0; y < currentGrid.height; y++) {
      for (let x = 0; x < currentGrid.width; x++) {
        if (currentGrid.cells[y][x]) beforeCount++;
        if (nextGrid.cells[y][x]) afterCount++;
      }
    }
    
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
    // Don't start if game is over
    if (isGameOver) return;
    
    // Start/stop the game loop based on isPlaying state
    if (isPlaying) {
      // Clear any existing interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Create new interval that fires at the current speed
      timerRef.current = setInterval(() => {
        nextGeneration();
      }, speed);
      
      // Cleanup function
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      };
    } else {
      // Stop the interval if game is paused
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isPlaying, grid, speed, isGameOver]); // Include isGameOver to prevent restart if game is over
  
  // Toggle play/pause
  const togglePlay = () => {
    // If game is over, reset the game instead of just toggling play state
    if (isGameOver) {
      resetGrid();
      return;
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // Step forward one generation manually
  const stepForward = () => {
    // Don't step if game is over
    if (isGameOver) return;
    
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
    setIsGameOver(false);
    
    // Update canvas
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = dims.width * cellSize;
      canvas.height = dims.height * cellSize;
      drawGrid(canvas, newGrid, cellSize, 0);
    }
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
    setIsGameOver(false);
    
    // Update canvas
    const canvas = canvasRef.current;
    if (canvas) {
      drawGrid(canvas, clearedGrid, cellSize, 0);
    }
  };
  
  // Handle canvas click
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    
    // Reset game over state when user interacts with the grid
    if (isGameOver) {
      setIsGameOver(false);
    }
    
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
    <div className={cx('flex', 'min-h-screen min-w-screen')}>
      {/* Game canvas background */}
      <canvas
        ref={canvasRef}
        className={cx("w-full h-full", zIndex)}
        onClick={handleCanvasClick}
        style={{
          display: 'block',
          imageRendering: 'pixelated',
          backgroundColor: 'black'
        }}
      />
      
      {/* Controls on top of canvas */}
      <GameOfLifeControls
        isPlaying={isPlaying}
        speed={speed}
        generation={generation}
        isGameOver={isGameOver}
        onTogglePlay={togglePlay}
        onReset={resetGrid}
        onClear={clearAllCells}
        onSpeedChange={setSpeed}
        className="z-50"
      />
    </div>
  );
};