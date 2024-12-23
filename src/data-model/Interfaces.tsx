import { InteractionCtx } from '../common/Types'
import Settings from '../context/Settings'
import { Layer } from './Layer'

// Interface for objects that can be drawn on the canvas
export interface Drawable {
  // Key is for htmlKey - it gives warning in console if not included
  draw(
    key: number,
    settingCtx: Settings,
    interactionCtx: InteractionCtx
  ): JSX.Element
  // Drawable has multiple layers in which it can be included
  layers: Layer[]
  // Drawable can have custom color
  color: string | null
  // Drawable has to have string representation
  toString(): string
}

// Interface for objects that can be compared to each other - standard Java compareTo pattern
export interface Comparable {
  // 0 => same, -number => other > this, +number => this > other
  compareTo(other: Comparable): number
}

// Returns index of item we are searching for, -1 if it is not included in the array
export const indexOf = (
  arr: Set<Comparable> | Comparable[],
  target: Comparable
): number => {
  if (arr instanceof Set) {
    arr = Array.from(arr.values())
  }

  for (const [index, item] of arr.entries()) {
    if (target.compareTo(item) === 0) {
      return index
    }
  }
  return -1
}

// Removes duplicites from array based on compareTo method
export const removeDuplicites = (
  arr: Comparable[] | undefined
): Comparable[] => {
  if (!arr) {
    return []
  }

  return arr.filter(
    (value, index, self) =>
      index === self.findIndex(t => t.compareTo(value) === 0)
  )
}
