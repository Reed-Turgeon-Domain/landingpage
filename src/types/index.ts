import { type ReactNode } from 'react'

export type Point = {
  x: number
  y: number
}

export type Vector = {
  start: Point
  end: Point
  length_in_px: number
} 

export interface MenuItemType {
  type: "Project" | "Social" | "Personal"
  isLive: boolean
  label: string
  href?: string
  hex?: string
  iconType?: "github" | "linkedin" | "email"
  segments: number[]
}