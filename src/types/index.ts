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
  type: "Project" | "Social"
  isLive: boolean
  label: string
  hex?: string
  href?: string
  segments: number[]
}