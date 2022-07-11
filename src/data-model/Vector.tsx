import LineComp from '../visual-components/LineComponent'
import { Drawable } from './Interfaces'
import { Layer } from './Layer'
import { Point } from './Point'

export class Vector implements Drawable {
  classTag = 'Vector'

  constructor(
    private _from: Point,
    private _to: Point,
    private _color?: string
  ) {}

  get layer(): Layer {
    return this._from.layer
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
