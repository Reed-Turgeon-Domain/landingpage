import type { GameGrid } from './types'

export const createEmptyGrid = (width: number, height: number): GameGrid => {
  const cells = Array(height).fill(null).map(() => Array(width).fill(false))
  return { width, height, cells }
}

export const createRandomGrid = (width: number, height: number, density: number = 0.15): GameGrid => {
  const cells = Array(height).fill(null).map(() => 
    Array(width).fill(null).map(() => Math.random() < density)
  )
  return { width, height, cells }
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
  const newCells = Array(grid.height).fill(null).map(() => Array(grid.width).fill(false))
  
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      const liveNeighbors = countLiveNeighbors(grid, x, y)
      const isAlive = grid.cells[y][x]
      
      if (isAlive) {
        newCells[y][x] = liveNeighbors === 2 || liveNeighbors === 3
      } else {
        newCells[y][x] = liveNeighbors === 3
      }
    }
  }
  
  return { ...grid, cells: newCells }
}

export const toggleCell = (grid: GameGrid, x: number, y: number): GameGrid => {
  if (x < 0 || x >= grid.width || y < 0 || y >= grid.height) return grid
  
  const newCells = grid.cells.map(row => [...row])
  newCells[y][x] = !newCells[y][x]
  
  return { ...grid, cells: newCells }
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