import { Clonable } from './Clonable'

export default class Settings extends Clonable {
  constructor(
    private _axisToggled: boolean = true,
    private _axisSize: number = 3,
    private _pointTagsToggled: boolean = true,
    private _pointTagsSize: number = 30,
    private _pointsToggled: boolean = true,
    private _pointSize: number = 0.05,
    private _arrowsToggled: boolean = true,
    private _arrowSize: number = 5
  ) {
    super()
  }

  // Updates need to clone, because it needs to rerender the component on change
  update(attrName: keyof Settings, value: unknown) {
    const clone = this.clone() as Settings
    clone[attrName] = value as never
    return clone
  }

  // Getters and setters
  get axisToggled(): boolean {
    return this._axisToggled
  }

  private set axisToggled(value: boolean) {
    this._axisToggled = value
  }

  get axisSize(): number {
    return this._axisSize
  }

  private set axisSize(value: number) {
    this._axisSize = value
  }

  get pointTagsToggled(): boolean {
    return this._pointTagsToggled
  }

  private set pointTagsToggled(value: boolean) {
    this._pointTagsToggled = value
  }

  get pointTagsSize(): number {
    return this._pointTagsSize
  }

  private set pointTagsSize(value: number) {
    this._pointTagsSize = value
  }

  get pointsToggled(): boolean {
    return this._pointsToggled
  }

  private set pointsToggled(value: boolean) {
    this._pointsToggled = value
  }

  get pointSize(): number {
    return this._pointSize
  }

  private set pointSize(value: number) {
    this._pointSize = value
  }

  get arrowsToggled(): boolean {
    return this._arrowsToggled
  }

  private set arrowsToggled(value: boolean) {
    this._arrowsToggled = value
  }

  get arrowSize(): number {
    return this._arrowSize
  }

  private set arrowSize(value: number) {
    this._arrowSize = value
  }
}
