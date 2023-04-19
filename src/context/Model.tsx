import { indexOf } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { Clonable } from './Clonable'

export class Model extends Clonable {
  constructor(
    private _points: Point[] = [],
    private _vectors: Vector[] = [],
    private _layers: Layer[] = []
  ) {
    super()
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
        error += `\n Point ${this.points[index]} already exists!`
      }
    })

    if (error.length === 0) {
      const clone = this.clone() as Model
      clone._points = [...clone._points, ...newPoints]
      return clone
    }
    throw Error(error)
  }

  public removePoints(points: Point[]): Model {
    const clone = this.clone() as Model
    points.forEach(point => clone._points.filter(item => item !== point))
    return clone
  }

  // Add new points if we don't already have them, replace with existing points otherwise
  private modifyVectorPoints(vector: Vector): Vector {
    const fromIndex = indexOf(this.points, vector.from)
    if (fromIndex === -1) {
      this._points.push(vector.from)
    } else {
      vector.from = this._points[fromIndex]
    }

    const toIndex = indexOf(this.points, vector.to)
    if (toIndex === -1) {
      this._points.push(vector.to)
    } else {
      vector.to = this._points[toIndex]
    }

    return vector
  }

  public addVectors(vectors: Vector[]): Model {
    let error = ''
    const newVectors: Vector[] = []

    vectors.forEach(vector => {
      if (vector.from.compareTo(vector.to) === 0) {
        error += `\n Vector ${vector.toString()} cannot have two same points!`
      } else {
        const index = indexOf(this.vectors, vector)
        if (index === -1) {
          // First we add points - if they don't exist already
          vector = this.modifyVectorPoints(vector)
          // Then we add vector
          newVectors.push(vector)
        } else {
          error += `\n Vector ${this.vectors[index]} already exists!`
        }
      }
    })

    if (error.length === 0) {
      const clone = this.clone() as Model
      clone._vectors = [...clone._vectors, ...newVectors]
      return clone
    }
    throw Error(error)
  }

  public removeVectors(vectors: Vector[]): Model {
    const clone = this.clone() as Model
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
        error += `\n Layer ${this.layers[index]} already exists!`
      }
    })

    if (error.length === 0) {
      const clone = this.clone() as Model
      clone._layers = [...clone._layers, ...newLayers]
      return clone
    }
    throw Error(error)
  }

  public removeLayer(layers: Layer[]): Model {
    const clone = this.clone() as Model
    layers.forEach(layer => clone._layers.filter(item => item !== layer))
    return clone
  }
}
