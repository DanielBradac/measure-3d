import { Context } from './Context'

export default class Settings implements Context {
  constructor(
    private _axisToggled: boolean = true,
    private _axisSize: number = 3,
    private _pointTagsToggled: boolean = true,
    private _pointTagsSize: number = 30,
    private _pointsToggled: boolean = true,
    private _pointSize: number = 0.05
  ) {}

  copy(): Settings {
    return new Settings(
      this._axisToggled,
      this._axisSize,
      this._pointTagsToggled,
      this._pointTagsSize,
      this._pointsToggled,
      this._pointSize
    )
  }

  get axisToggled(): boolean {
    return this._axisToggled
  }

  // Updates need to clone, because it needs to rerender the component on change
  updateAxisToggled(value: boolean): Settings {
    const clone = this.copy()
    clone._axisToggled = value
    return clone
  }

  get axisSize(): number {
    return this._axisSize
  }

  updateAxisSize(value: number): Settings {
    const clone = this.copy()
    clone._axisSize = value
    return clone
  }

  get pointTagsToggled(): boolean {
    return this._pointTagsToggled
  }

  updatePointTagsToggled(value: boolean): Settings {
    const clone = this.copy()
    clone._pointTagsToggled = value
    return clone
  }

  get pointTagsSize(): number {
    return this._pointTagsSize
  }

  updatePointTagsSize(value: number): Settings {
    const clone = this.copy()
    clone._pointTagsSize = value
    return clone
  }

  get pointsToggled(): boolean {
    return this._pointsToggled
  }

  updatePointsToggled(value: boolean): Settings {
    const clone = this.copy()
    clone._pointsToggled = value
    return clone
  }

  get pointSize(): number {
    return this._pointSize
  }

  updatePointSize(value: number): Settings {
    const clone = this.copy()
    clone._pointSize = value
    return clone
  }
}
