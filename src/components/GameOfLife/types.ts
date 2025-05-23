export interface Cell {
  x: number
  y: number
  alive: boolean
  color?: string
}

export interface GameGrid {
  width: number
  height: number
  cells: boolean[][]
  cellColors?: string[][]
}

export interface GameState {
  grid: GameGrid
  generation: number
  isPlaying: boolean
  speed: number
}

export interface GameOfLifeConfig {
  cellSize: number
  initialDensity: number
  autoPlay: boolean
  speed: number
}

export interface Coordinates {
  x: number
  y: number
} 