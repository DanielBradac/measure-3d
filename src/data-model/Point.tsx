import Settings from '../context/Settings'
import PointComp from '../visual-components/PointComponent'
import { Comparable, Drawable } from './Interfaces'
import { Layer } from './Layer'
import { Vector } from './Vector'

export class Point implements Drawable, Comparable {
  constructor(
    private _x: number,
    private _y: number,
    private _z: number,
    private _tag: string,
    private _layers: Layer[],
    private _color?: string
  ) {
    if (_layers.length === 0) {
      throw Error('Point must have at least one layer!')
    }
  }

  compareTo(other: Comparable): number {
    if (!(other instanceof Point)) {
      return -1
    }

    if (this.x === other.x && this.y === other.y && this.z === other.z) {
      return 0
    }

    if (this.x !== other.x) {
      return this.x - other.x
    }
    if (this.y !== other.y) return this.y - other.y
    return this.z - other.z
  }

  private _vectors: Set<Vector> = new Set<Vector>()

  get layers() {
    return this._layers
  }

  set layers(value: Layer[]) {
    this._layers = value
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

  get vectors(): Set<Vector> {
    return this._vectors
  }

  addVector(newVector: Vector) {
    this._vectors.add(newVector)
  }

  removeVector(toRemove: Vector) {
    this._vectors.delete(toRemove)
  }

  draw(key: number, ctx: Settings): JSX.Element {
    // Import global settings
    const { pointTagsToggled, pointTagsSize, pointSize } = ctx
    return (
      <PointComp
        center={[this._x, this._y, this._z]}
        radius={pointSize}
        color={this._color || this.layers[0].color}
        key={key}
        tag={this._tag}
        showTag={pointTagsToggled}
        tagSize={pointTagsSize}
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
