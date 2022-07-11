import Settings from '../context/Settings'
import PointComp from '../visual-components/PointComponent'
import { Drawable } from './Interfaces'
import { Layer } from './Layer'

export class Point implements Drawable {
  classTag = 'Point'

  constructor(
    private _x: number,
    private _y: number,
    private _z: number,
    private _tag: string,
    private _layer: Layer,
    private _color?: string
  ) {}

  get layer() {
    return this._layer
  }

  set layer(value: Layer) {
    this._layer = value
  }

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

  draw(key: number, ctx: Settings): JSX.Element {
    // Import global settings
    const { pointTagsToggled, pointTagsSize, pointSize } = ctx
    return (
      <PointComp
        center={[this._x, this._y, this._z]}
        radius={pointSize}
        color={this._color || this.layer.color}
        key={key}
        tag={this._tag}
        showTag={pointTagsToggled}
        tagSize={pointTagsSize}
      />
    )
  }

  toString(): string {
    if (this._tag) {
      return `${this._tag}: [X: ${this.x}; Y: ${this.y}; Z: ${this.z}] (${this.layer.name})`
    }
    return `[X: ${this.x}; Y: ${this.y}; Z: ${this.z}] (${this.layer.name})`
  }
}
