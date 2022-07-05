import { useContext } from 'react'
import { SettingsContext } from '../App'
import LineComp from '../visual-components/LineComponent'
import PointComp from '../visual-components/PointComponent'
import { Layer } from './Layer'

export interface Drawable {
  draw(key: number): JSX.Element
  classTag: string
  layer: Layer
}

export class Vector implements Drawable {
  classTag = 'Vector'

  constructor(
    private _from: Point,
    private _to: Point,
    private _layer: Layer,
    private _color?: string
  ) {}

  get layer() {
    return this._layer
  }

  set layer(value: Layer) {
    this._layer = value
  }

  draw(key: number): JSX.Element {
    return (
      <LineComp
        start={[this._from.x, this._from.y, this._from.z]}
        end={[this._to.x, this._to.y, this._to.z]}
        color={this._color || this.layer.color}
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

  draw(key: number): JSX.Element {
    // Import global settings
    const { pointTagsToggled, pointTagsSize, pointSize } =
      useContext(SettingsContext)
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
