import { indexOf } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { Context } from './Context'

// TODO hodně metod je tu stejných - nějak refaktorovat do jedné
export class Model implements Context {
  constructor(
    private _points: Point[] = [],
    private _vectors: Vector[] = [],
    private _layers: Layer[] = []
  ) {}

  copy(): Model {
    return new Model(this._points, this._vectors, this._layers)
  }

  public get points(): Point[] {
    return this._points
  }

  public get vectors(): Vector[] {
    return this._vectors
  }

  public get layers(): Layer[] {
    return this._layers
  }

  // All methods work with arrays to avoid as much cloning as possible

  public addPoints(points: Point[]): Model {
    let error = ''
    const newPoints: Point[] = []
    points.forEach(point => {
      const index = indexOf(this.points, point)
      if (index === -1) {
        newPoints.push(point)
      } else {
        error += `\n Point ${point.toString()} already exists, index: ${index}`
      }
    })

    if (error.length === 0) {
      const clone = this.copy()
      clone._points = [...clone._points, ...newPoints]
      return clone
    }
    throw Error(error)
  }

  public removePoints(points: Point[]): Model {
    const clone = this.copy()
    points.forEach(point => clone._points.filter(item => item !== point))
    return clone
  }

  public addVectors(vectors: Vector[]): Model {
    let error = ''
    const newVectors: Vector[] = []

    vectors.forEach(vector => {
      const index = indexOf(this.vectors, vector)
      if (index === -1) {
        newVectors.push(vector)
        console.log(`Adding vector with length ${vector.length()}`)
      } else {
        error += `\n Vector ${vector.toString()} already exists, index: ${index}`
      }
    })

    if (error.length === 0) {
      const clone = this.copy()
      clone._vectors = [...clone._vectors, ...newVectors]
      return clone
    }
    throw Error(error)
  }

  public removeVectors(vectors: Vector[]): Model {
    const clone = this.copy()
    vectors.forEach(vector => clone._vectors.filter(item => item !== vector))
    return clone
  }

  public addLayer(layers: Layer[]): Model {
    let error = ''
    const newLayers: Layer[] = []

    layers.forEach(layer => {
      const index = indexOf(this.layers, layer)
      if (index === -1) {
        newLayers.push(layer)
      } else {
        error += `\n Layer ${layer.toString()} already exists, index: ${index}`
      }
    })

    if (error.length === 0) {
      const clone = this.copy()
      clone._layers = [...clone._layers, ...newLayers]
      return clone
    }
    throw Error(error)
  }

  public removeLayer(layers: Layer[]): Model {
    const clone = this.copy()
    layers.forEach(layer => clone._layers.filter(item => item !== layer))
    return clone
  }
}
