import { Comparable } from './Interfaces'

export class Layer implements Comparable {
  constructor(private _name: string, private _color: string) {}

  compareTo(other: Layer): number {
    if (!(other instanceof Layer)) {
      return -1
    }

    return this.name.localeCompare(other.name)
  }

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
