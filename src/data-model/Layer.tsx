import { Comparable } from './Comparable'

export class Layer implements Comparable {
  constructor(private _name: string, private _color: string) {}

  compareTo(other: Layer): number {
    return this.name.localeCompare(other.name)
  }

  indexIn(layerArr: Layer[]): number {
    for (const [index, layer] of layerArr.entries()) {
      if (layer.compareTo(this) === 0) {
        return index
      }
    }
    return -1
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
