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

  public editPoint(existingPoint: Point, newPoint: Point): Model {
    let error = ''
    this.points.forEach(point => {
      if (
        point.compareTo(newPoint) === 0 &&
        point.compareTo(existingPoint) !== 0
      ) {
        error += `Coordinates already occupied by: ${point}`
      }
    })

    if (error.length === 0) {
      existingPoint.x = newPoint.x
      existingPoint.y = newPoint.y
      existingPoint.z = newPoint.z
      existingPoint.layers = newPoint.layers
      existingPoint.tag = newPoint.tag
      return this.clone() as Model
    }

    throw Error(error)
  }

  public removePoints(points: Point[]): Model {
    const clone = this.clone() as Model
    let error = ''
    points.forEach(point => {
      const index = clone.points.indexOf(point)
      if (index === -1) {
        error += `Point ${point.toString()} not found`
      } else {
        clone.points.splice(index, 1)
      }
    })

    if (error.length === 0) {
      return clone
    }
    throw Error(error)
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
    let error = ''

    vectors.forEach(vector => {
      const index = clone.vectors.indexOf(vector)
      if (index === -1) {
        error += `Vector ${vector.toString()} not found`
      } else {
        clone.vectors.splice(index, 1)
      }
    })

    if (error.length === 0) {
      return clone
    }
    throw Error(error)
  }

  public swapDirection(vector: Vector): Model {
    console.log(vector)
    const tempFrom = vector.from
    vector.from = vector.to
    vector.to = tempFrom
    return this.clone() as Model
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
