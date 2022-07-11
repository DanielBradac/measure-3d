import Settings from '../context/Settings'
import { Layer } from './Layer'

// Interface for objects that can be drawn on the canvas
export interface Drawable {
  draw(key: number, ctx?: Settings): JSX.Element
  classTag: string
  layer: Layer
}

// Interface for objects that can be compared to each other - standard Java compareTo pattern
export interface Comparable {
  // 0 => same, -number => other > this, +number => this > other
  compareTo(other: Comparable): number
}
