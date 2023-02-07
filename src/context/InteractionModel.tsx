import { Drawable } from '../data-model/Interfaces'
import { Clonable } from './Clonable'

export default class InteractionModel extends Clonable {
  constructor(private _clicked: Drawable | null = null) {
    super()
  }

  // Updates need to clone, because it needs to rerender the component on change
  update(interactionType: keyof InteractionModel, element: Drawable | null) {
    const clone = this.clone() as InteractionModel
    clone[interactionType] = element as never
    return clone
  }

  // Getters and setters
  get clicked(): Drawable | null {
    return this._clicked
  }

  private set clicked(value: Drawable | null) {
    this.clicked = value
  }
}
