import type { GameGrid } from './types'

// Helper function to generate a random color
export const getRandomColor = (): string => {
  const colors = [
    '#ff0000', // Red
    '#00ff00', // Green
    '#0000ff', // Blue
    '#ffff00', // Yellow
    '#ff00ff', // Magenta
    '#00ffff', // Cyan
    '#ff8000', // Orange
    '#8000ff', // Purple
    '#00ff80', // Mint
    '#ff0080', // Pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const createEmptyGrid = (width: number, height: number): GameGrid => {
  const cells = Array(height).fill(null).map(() => Array(width).fill(false));
  const cellColors = Array(height).fill(null).map(() => Array(width).fill('#ffffff'));
  return { width, height, cells, cellColors };
}

export const createRandomGrid = (width: number, height: number, density: number = 0.15): GameGrid => {
  const cells = Array(height).fill(null).map(() => 
    Array(width).fill(null).map(() => Math.random() < density)
  );
  
  const cellColors = Array(height).fill(null).map(() => Array(width).fill('#ffffff'));
  
  return { width, height, cells, cellColors };
}

export const countLiveNeighbors = (grid: GameGrid, x: number, y: number): number => {
  let count = 0
  
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue
      
      const nx = x + dx
      const ny = y + dy
      
      if (nx >= 0 && nx < grid.width && ny >= 0 && ny < grid.height) {
        if (grid.cells[ny][nx]) count++
      }
    }
  }
  
  return count
}

export const getNextGeneration = (grid: GameGrid): GameGrid => {
  const newCells = Array(grid.height).fill(null).map(() => Array(grid.width).fill(false));
  const newCellColors = Array(grid.height).fill(null).map(() => Array(grid.width).fill(null));
  
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const liveNeighbors = countLiveNeighbors(grid, x, y);
      const isAlive = grid.cells[y][x];
      
      if (isAlive) {
        newCells[y][x] = liveNeighbors === 2 || liveNeighbors === 3;
        // Keep existing color if the cell stays alive
        if (newCells[y][x] && grid.cellColors?.[y][x]) {
          newCellColors[y][x] = grid.cellColors[y][x];
        }
      } else {
        newCells[y][x] = liveNeighbors === 3;
        // If cell becomes alive, 1% chance of random color
        if (newCells[y][x]) {
          newCellColors[y][x] = Math.random() < 0.05 ? getRandomColor() : '#ffffff';
        }
      }
    }
  }
  
  return { ...grid, cells: newCells, cellColors: newCellColors };
}

export const toggleCell = (grid: GameGrid, x: number, y: number): GameGrid => {
  if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) return grid;
  
  const newCells = grid.cells.map(row => [...row]);
  const newCellColors = grid.cellColors ? grid.cellColors.map(row => [...row]) : Array(grid.height).fill(null).map(() => Array(grid.width).fill('#ffffff'));
  
  // Toggle cell state
  newCells[y][x] = !newCells[y][x];
  
  // If the cell is turned ON, 1% chance of random color
  if (newCells[y][x]) {
    newCellColors[y][x] = Math.random() < 0.01 ? getRandomColor() : '#ffffff';
  } else {
    newCellColors[y][x] = null;
  }
  
  return { ...grid, cells: newCells, cellColors: newCellColors };
}

export const clearGrid = (grid: GameGrid): GameGrid => {
  return createEmptyGrid(grid.width, grid.height)
}

export const getGridDimensions = (canvasWidth: number, canvasHeight: number, cellSize: number) => {
  return {
    width: Math.floor(canvasWidth / cellSize),
    height: Math.floor(canvasHeight / cellSize)
  }
} 