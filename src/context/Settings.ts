export default class Settings {
  constructor(
    private _axisToggled: boolean = true,
    private _axisSize: number = 3,
    private _pointTagsToggled: boolean = true,
    private _pointTagsSize: number = 8,
    private _pointSize: number = 0.025
  ) {}

  get axisToggled(): boolean {
    return this._axisToggled
  }

  // We used modified setter, so that we can save lines in state changes
  setAxisToggled(value: boolean): Settings {
    this._axisToggled = value
    return this
  }

  get axisSize(): number {
    return this._axisSize
  }

  setAxisSize(value: number): Settings {
    this._axisSize = value
    return this
  }

  get pointTagsToggled(): boolean {
    return this._pointTagsToggled
  }

  // We used modified setter, so that we can save lines in state changes
  setPointTagsToggled(value: boolean): Settings {
    this._pointTagsToggled = value
    return this
  }

  get pointTagsSize(): number {
    return this._pointTagsSize
  }

  setPointTagsSize(value: number): Settings {
    this._pointTagsSize = value
    return this
  }

  get pointSize(): number {
    return this._pointSize
  }

  setPointSize(value: number): Settings {
    this._pointSize = value
    return this
  }

  copy(): Settings {
    return new Settings(this._axisToggled, this._axisSize, this._pointTagsToggled, this._pointTagsSize, this._pointSize)
  }
}
