import { useRef, useEffect, useCallback, memo } from 'react'
import type { GameGrid } from './types'

interface GameOfLifeCanvasProps {
  grid: GameGrid
  cellSize: number
  onCellClick: (x: number, y: number) => void
  className?: string
}

// Use memo to prevent unnecessary re-renders
const GameOfLifeCanvas = memo(({ 
  grid, 
  cellSize, 
  onCellClick, 
  className = '' 
}: GameOfLifeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevGridRef = useRef<GameGrid | null>(null);
  const isInitialized = useRef<boolean>(false);
  
  // Draw the grid on canvas
  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null when trying to draw grid");
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("Could not get 2D context from canvas");
      return;
    }
    
    // Clear with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cells
    let aliveCount = 0;
    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        if (grid.cells[y][x]) {
          aliveCount++;
          
          // Use the cell's color if available, otherwise default to white
          if (grid.cellColors && grid.cellColors[y][x]) {
            ctx.fillStyle = grid.cellColors[y][x];
          } else {
            ctx.fillStyle = '#ffffff';
          }
          
          ctx.fillRect(
            x * cellSize, 
            y * cellSize, 
            cellSize, 
            cellSize
          );
        }
      }
    }
  }, [grid, cellSize]);

  // Handle click on canvas
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);

    onCellClick(x, y);
  }, [cellSize, onCellClick]);

  // Initialize canvas size and draw initial grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas ref is null during initialization");
      return;
    }

    // Resize canvas to match grid dimensions
    const gridWidthPx = grid.width * cellSize;
    const gridHeightPx = grid.height * cellSize;
    
    canvas.width = gridWidthPx;
    canvas.height = gridHeightPx;
    
    // Draw initial grid
    drawGrid();
    prevGridRef.current = grid;
    isInitialized.current = true;
  }, [grid.width, grid.height, cellSize, drawGrid]);

  // Update drawing when grid changes
  useEffect(() => {
    // Skip initial render since we already drew in the initialization effect
    if (!isInitialized.current) return;
    
    // Check if grid reference has changed
    if (prevGridRef.current === grid) {
      return;
    }
    
    drawGrid();
    prevGridRef.current = grid;
  }, [grid, drawGrid]);

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      className={className}
      style={{
        display: 'block',
        imageRendering: 'pixelated',
        backgroundColor: 'black' // Fallback color
      }}
    />
  );
});

export { GameOfLifeCanvas }; 