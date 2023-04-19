import { Drawable } from '../data-model/Interfaces'

const CLICKED_COLOR = '#2563EB'

export function getElementColor(
  element: Drawable,
  clicked: Drawable | null
): string {
  if (element === clicked) {
    return CLICKED_COLOR
  }
  return element.color || element.layers[0].color
}
