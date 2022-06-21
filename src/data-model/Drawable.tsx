import LineComp from '../visual-components/LineComponent'
import PointComp from '../visual-components/PointComponent'

export interface Drawable {
  draw(key: number): JSX.Element
  classTag: string
}

export class Vector implements Drawable {
  classTag = 'Vector'

  constructor(
    private _from: Point,
    private _to: Point,
    private _color: string = 'black'
  ) {}

  draw(key: number): JSX.Element {
    return (
      <LineComp
        start={[this._from.x, this._from.y, this._from.z]}
        end={[this._to.x, this._to.y, this._to.z]}
        color={this._color}
        key={key}
      />
    )
  }
}

export class Point implements Drawable {
  classTag = 'Point'

  constructor(
    private _x: number,
    private _y: number,
    private _z: number,
    private _tag: string,
    private _color: string = 'black'
  ) {}

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  get z(): number {
    return this._z
  }

  get tag(): string {
    return this._tag
  }

  draw(key: number): JSX.Element {
    return (
      <PointComp
        center={[this._x, this._y, this._z]}
        radius={0.025}
        color={this._color}
        key={key}
        tag={this._tag}
      />
    )
  }

  toString(): string {
    if (this._tag) {
      return `${this._tag}: [X: ${this.x}; Y: ${this.y}; Z: ${this.z}]`
    }
    return `[X: ${this.x}; Y: ${this.y}; Z: ${this.z}]`
  }
}
