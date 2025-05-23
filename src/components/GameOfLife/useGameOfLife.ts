import { useState, useEffect, useRef, useCallback } from 'react'
import type { GameGrid, GameState, GameOfLifeConfig } from './types'
import { 
  createEmptyGrid, 
  createRandomGrid, 
  getNextGeneration, 
  toggleCell, 
  clearGrid,
  getGridDimensions 
} from './gameLogic'

// Constant for exact 1-second interval
const ONE_SECOND = 1000;

export const useGameOfLife = (canvasWidth: number, canvasHeight: number, config: GameOfLifeConfig) => {
  // Store entire game state in a ref to avoid re-renders
  const gameStateRef = useRef<GameState>({
    grid: createEmptyGrid(1, 1), // Default empty grid
    generation: 0,
    isPlaying: false,
    speed: ONE_SECOND
  });
  
  // Expose a limited version of the state to React for UI updates
  const [displayState, setDisplayState] = useState<GameState>(gameStateRef.current);
  
  // Interval timer ref
  const timerRef = useRef<number | null>(null);
  // Track last update time
  const lastUpdateRef = useRef<number>(0);

  // Initialize game state once
  useEffect(() => {
    // Only initialize if we have valid dimensions
    if (canvasWidth <= 0 || canvasHeight <= 0) return;
    
    const { width, height } = getGridDimensions(canvasWidth, canvasHeight, config.cellSize);
    const grid = createRandomGrid(width, height, config.initialDensity);
    
    // Initialize state
    gameStateRef.current = {
      grid,
      generation: 0,
      isPlaying: config.autoPlay,
      speed: ONE_SECOND // Always use 1 second
    };
    
    // Update display state
    setDisplayState({...gameStateRef.current});
    
    console.log(`Game initialized with grid ${width}x${height}, speed: ${ONE_SECOND}ms`);
  }, [canvasWidth, canvasHeight, config.cellSize, config.initialDensity, config.autoPlay]);

  // Process one generation
  const processGeneration = useCallback(() => {
    const now = Date.now();
    const currentGen = gameStateRef.current.generation;
    const elapsed = now - lastUpdateRef.current;
    
    console.log(`GENERATION #${currentGen + 1} at ${now} (${elapsed}ms since last)`);
    
    // Update the game state
    gameStateRef.current = {
      ...gameStateRef.current,
      grid: getNextGeneration(gameStateRef.current.grid),
      generation: currentGen + 1
    };
    
    // Update display state
    setDisplayState({...gameStateRef.current});
    
    // Update the last update time
    lastUpdateRef.current = now;
  }, []);

  // Start the game loop
  const startGameLoop = useCallback(() => {
    // Don't start if already running
    if (timerRef.current !== null) return;
    
    console.log("Starting game loop - 1 second per generation");
    lastUpdateRef.current = Date.now();
    
    // Use setInterval for precise timing
    timerRef.current = window.setInterval(() => {
      processGeneration();
    }, ONE_SECOND);
    
    // Update play state
    gameStateRef.current.isPlaying = true;
    setDisplayState({...gameStateRef.current});
  }, [processGeneration]);

  // Stop the game loop
  const stopGameLoop = useCallback(() => {
    if (timerRef.current === null) return;
    
    console.log("Stopping game loop");
    window.clearInterval(timerRef.current);
    timerRef.current = null;
    
    // Update play state
    gameStateRef.current.isPlaying = false;
    setDisplayState({...gameStateRef.current});
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (gameStateRef.current.isPlaying) {
      stopGameLoop();
    } else {
      startGameLoop();
    }
  }, [startGameLoop, stopGameLoop]);

  // Advance one generation manually
  const nextGeneration = useCallback(() => {
    processGeneration();
  }, [processGeneration]);

  // Reset grid to new random state
  const resetGrid = useCallback((width: number = canvasWidth, height: number = canvasHeight) => {
    if (width <= 0 || height <= 0) return;
    
    const dims = getGridDimensions(width, height, config.cellSize);
    const newGrid = createRandomGrid(dims.width, dims.height, config.initialDensity);
    
    console.log(`Resetting grid to ${dims.width}x${dims.height}, generation #0`);
    
    // Update game state
    gameStateRef.current = {
      ...gameStateRef.current,
      grid: newGrid,
      generation: 0
    };
    
    // Update display state
    setDisplayState({...gameStateRef.current});
  }, [canvasWidth, canvasHeight, config.cellSize, config.initialDensity]);

  // Clear all cells
  const clearAllCells = useCallback(() => {
    // Get current grid dimensions
    const { width, height } = gameStateRef.current.grid;
    
    console.log(`Clearing grid ${width}x${height}, resetting to generation #0`);
    
    // Update game state
    gameStateRef.current = {
      ...gameStateRef.current,
      grid: clearGrid(gameStateRef.current.grid),
      generation: 0
    };
    
    // Update display state
    setDisplayState({...gameStateRef.current});
  }, []);

  // Toggle a cell state on click
  const handleCellClick = useCallback((x: number, y: number) => {
    // Ensure coordinates are valid
    const { width, height } = gameStateRef.current.grid;
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    
    console.log(`Toggling cell at ${x},${y}`);
    
    // Update game state
    gameStateRef.current = {
      ...gameStateRef.current,
      grid: toggleCell(gameStateRef.current.grid, x, y)
    };
    
    // Update display state
    setDisplayState({...gameStateRef.current});
  }, []);

  // Set speed (always 1 second in this version)
  const setSpeed = useCallback((_newSpeed: number) => {
    // Do nothing - speed is fixed at 1 second
    console.log("Speed changes ignored - fixed at 1 second per generation");
  }, []);

  // Resize grid
  const resizeGrid = useCallback((newWidth: number, newHeight: number) => {
    if (newWidth <= 0 || newHeight <= 0) return;
    
    // Stop game loop if running
    if (gameStateRef.current.isPlaying) {
      stopGameLoop();
    }
    
    // Reset with new dimensions
    resetGrid(newWidth, newHeight);
  }, [resetGrid, stopGameLoop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
        console.log("Cleaning up game loop");
      }
    };
  }, []);

  // Handle play state changes
  useEffect(() => {
    if (displayState.isPlaying && timerRef.current === null) {
      startGameLoop();
    } else if (!displayState.isPlaying && timerRef.current !== null) {
      stopGameLoop();
    }
  }, [displayState.isPlaying, startGameLoop, stopGameLoop]);

  return {
    gameState: displayState,
    actions: {
      togglePlay,
      nextGeneration,
      resetGrid,
      clearAllCells,
      handleCellClick,
      setSpeed,
      resizeGrid
    }
  };
}; 