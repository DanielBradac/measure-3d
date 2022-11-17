import LineComp from '../visual-components/LineComponent'
import { Comparable, Drawable } from './Interfaces'
import { Layer } from './Layer'
import { Point } from './Point'

export class Vector implements Drawable, Comparable {
  constructor(
    private _from: Point,
    private _to: Point,
    private _color?: string
  ) {}

  compareTo(other: Comparable): number {
    if (!(other instanceof Vector)) {
      return -1
    }
    if (
      this._from.compareTo(other._from) === 0 &&
      this._to.compareTo(other._to) === 0
    ) {
      return 0
    }

    if (this.length() > other.length()) {
      return 1
    }
    return -1
  }

  get layers(): Layer[] {
    return [...this._from.layers, ...this._to.layers]
  }

  get from(): Point {
    return this._from
  }

  set from(value: Point) {
    this._from = value
  }

  get to(): Point {
    return this._to
  }

  set to(value: Point) {
    this._to = value
  }

  // Returns vector cooridinates
  vecCoor(): number[] {
    return [
      this.to.x - this.from.x,
      this.to.y - this.from.y,
      this.to.z - this.from.z,
    ]
  }

  // Returns vector length
  length(): number {
    const coor = this.vecCoor()
    return Math.sqrt(
      Math.pow(coor[0], 2) + Math.pow(coor[1], 2) + Math.pow(coor[2], 2)
    )
  }

  draw(key: number): JSX.Element {
    return (
      <LineComp
        start={[this._from.x, this._from.y, this._from.z]}
        end={[this._to.x, this._to.y, this._to.z]}
        color={this._color || this.layers[0].color}
        key={key}
        showArrow={true}
        arrowSize={1}
      />
    )
  }

  toString(): string {
    return `(${this.from} -> ${this.to})`
  }
}
