export class Layer {
  constructor(private _name: string, private _color: string) {}

  get color(): string {
    return this._color
  }

  set color(value: string) {
    this._color = value
  }

  get name(): string {
    return this._name
  }

  set name(value: string) {
    this._name = value
  }
}
