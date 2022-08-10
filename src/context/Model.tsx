import { indexOf } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { Context } from './Context'

export class Model implements Context {
  constructor(
    private _points: Set<Point>,
    private _vectors: Set<Vector>,
    private _layers: Set<Layer>
  ) {}

  copy(): Model {
    return new Model(this._points, this._vectors, this._layers)
  }

  public get points(): Set<Point> {
    return this._points
  }

  public get vectors(): Set<Vector> {
    return this._vectors
  }

  public get layers(): Set<Layer> {
    return this._layers
  }

  public addPoint(point: Point): Model {
    const index = indexOf(this.points, point)
    if (index !== -1) {
      const clone = this.copy()
      clone._points.add(point)
      return clone
    }
    throw Error(`Point already exists, index: ${index}`)
  }

  // TODO addVector, removePoint, removeVector, addLayer, removeLayer
}
