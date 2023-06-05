import { indexOf } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { getDefaultModel } from '../test-data/TestData'
import { Clonable } from './Clonable'

export class ModelManager extends Clonable {
  constructor(
    private versions: Model[] = [getDefaultModel()],
    private currIndex: number = 0,
    private maxVersions: number = 30
  ) {
    super()
  }

  public currentModel(): Model {
    return this.versions[this.currIndex]
  }

  public forward() {
    if (this.currIndex < this.versions.length - 1) {
      this.currIndex++
    }
  }

  public backward() {
    if (this.currIndex > 0) {
      this.currIndex--
    }
  }

  public addVersion(newVersion: Model) {
    if (this.currIndex === this.versions.length - 1) {
      if (this.versions.length >= this.maxVersions) {
        this.versions.shift()
      }
    } else {
      this.versions.length = this.currIndex + 1
    }
    this.versions = [...this.versions, newVersion]
    this.currIndex = this.versions.length - 1
  }
}

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

  public addPoint(point: Point): Model {
    const index = indexOf(this.points, point)
    if (index !== -1) {
      throw new Error(`Point ${this.points[index]} already exists!`)
    }

    const clone = this.clone() as Model
    clone._points = [...clone._points, point]
    return clone
  }

  public editPoint(existingPoint: Point, newPoint: Point): Model {
    for (const point of this.points) {
      if (
        point.compareTo(newPoint) === 0 &&
        point.compareTo(existingPoint) !== 0
      ) {
        throw new Error(`Coordinates already occupied by: ${point}`)
      }
    }

    existingPoint.x = newPoint.x
    existingPoint.y = newPoint.y
    existingPoint.z = newPoint.z
    existingPoint.layers = newPoint.layers
    existingPoint.tag = newPoint.tag
    return this.clone() as Model
  }

  public removePoint(point: Point): Model {
    const index = this.points.indexOf(point)
    if (index === -1) {
      throw Error(`Point ${point.toString()} not found`)
    }
    for (const vector of this.vectors) {
      if (vector.from === point || vector.to === point) {
        throw Error(`Point ${point.toString()} is part of a vector`)
      }
    }

    const clone = this.clone() as Model
    clone.points.splice(index, 1)
    return clone
  }

  // Add new points if we don't already have them, replace with existing points otherwise
  private fillInVectorPoints(vector: Vector): Vector {
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

  public addVector(vector: Vector): Model {
    if (vector.from.compareTo(vector.to) === 0) {
      throw new Error(
        `Vector ${vector.toString()} cannot have two same points!`
      )
    }

    const index = indexOf(this.vectors, vector)
    if (index !== -1) {
      throw new Error(`Vector ${this.vectors[index]} already exists!`)
    }

    const clone = this.clone() as Model
    // First we add points - if they don't exist already, then we add vector
    clone._vectors = [...clone._vectors, this.fillInVectorPoints(vector)]
    return clone
  }

  public removeVector(vector: Vector): Model {
    const index = this.vectors.indexOf(vector)
    if (index === -1) {
      throw new Error(`Vector ${vector.toString()} not found`)
    }

    const clone = this.clone() as Model
    clone.vectors.splice(index, 1)
    return clone
  }

  public swapDirection(vector: Vector): Model {
    const tempFrom = vector.from
    vector.from = vector.to
    vector.to = tempFrom
    return this.clone() as Model
  }

  public addLayer(layer: Layer): Model {
    const index = indexOf(this.layers, layer)
    if (index !== -1) {
      throw new Error(`Layer ${this.layers[index]} already exists!`)
    }

    const clone = this.clone() as Model
    clone._layers = [...clone._layers, layer]
    return clone
  }

  public removeLayer(layer: Layer): Model {
    const index = this.layers.indexOf(layer)
    if (index === -1) {
      throw new Error(`Layer ${layer.toString()} not found`)
    }

    const clone = this.clone() as Model
    clone.layers.splice(index, 1)
    return clone
  }
}
