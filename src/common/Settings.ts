export default class Settings {
  constructor(
    private _axisToggled: boolean = false,
    private _axisSize: number = 1
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

  copy(): Settings {
    return new Settings(this._axisToggled, this._axisSize);
  }
}
