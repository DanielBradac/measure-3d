import { InteractionCtx } from '../common/Types'
import Settings from '../context/Settings'
import PointComp from '../graphical-panel/PointComponent'
import { Comparable, Drawable } from './Interfaces'
import { Layer } from './Layer'

export class Point implements Drawable, Comparable {
  constructor(
    private _x: number,
    private _y: number,
    private _z: number,
    private _tag: string,
    private _layers: Layer[],
    private _color: string | null = null
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

  get layers() {
    return this._layers
  }

  set layers(value: Layer[]) {
    this._layers = value
  }

  get x(): number {
    return this._x
  }

  set x(value: number) {
    this._x = value
  }

  get y(): number {
    return this._y
  }

  set y(value: number) {
    this._y = value
  }

  get z(): number {
    return this._z
  }

  set z(value: number) {
    this._z = value
  }

  get tag(): string {
    return this._tag
  }

  set tag(value: string) {
    this._tag = value
  }

  get color(): string | null {
    return this._color
  }

  draw(
    key: number,
    settingCtx: Settings,
    interactionCtx: InteractionCtx
  ): JSX.Element {
    // Import global settings
    const { pointTagsToggled, pointTagsSize, pointSize, pointsToggled } =
      settingCtx
    return (
      <PointComp
        point={this}
        radius={pointSize}
        key={key}
        showTag={pointTagsToggled}
        tagSize={pointTagsSize}
        showPoint={pointsToggled}
        interactions={interactionCtx}
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
