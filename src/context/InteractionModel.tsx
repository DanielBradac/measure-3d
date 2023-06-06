import { Drawable } from '../data-model/Interfaces'

export default class InteractionModel {
  constructor(private _clicked: Drawable | null = null) {}

  // Updates need to clone, because it needs to rerender the component on change
  update(interactionType: keyof InteractionModel, element: Drawable | null) {
    this[interactionType] = element as never
    // Shallow copy is enough here
    return Object.create(this) as InteractionModel
  }

  // Getters and setters
  get clicked(): Drawable | null {
    return this._clicked
  }

  private set clicked(value: Drawable | null) {
    if (value === this._clicked) {
      this._clicked = null
      return
    }
    this._clicked = value
  }
}
