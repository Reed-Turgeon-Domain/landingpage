export type Point = {
  x: number
  y: number
}

export type Vector = {
  start: Point
  end: Point
  length_in_px: number
} 

export type MenuItemType = {
    label: string
    segments: number[]
    href?: string
    IconComponent?: React.ComponentType<{ size: number }>
}