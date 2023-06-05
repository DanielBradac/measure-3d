import InteractionModel from '../context/InteractionModel'
import { Model } from '../context/Model'
import { Drawable } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'

export type SelectOption = {
  value: string | number | readonly string[] | undefined
  label: string
}

export type InteractionCtx = {
  interact: (attrName: keyof InteractionModel, value: Drawable | null) => void
  interModel: InteractionModel
}

export type ModelCtx = {
  model: Model
  forward: () => void
  backward: () => void
  addPoint: (newPoint: Point) => boolean
  addVector: (newVector: Vector) => boolean
  editPoint: (existingPoint: Point, newPoint: Point) => boolean
  removePoint: (point: Point) => boolean
  removeVector: (vector: Vector) => boolean
  swapDirection: (vector: Vector) => boolean
  removeLayer: (layer: Layer) => boolean
}

// Number declares position on the tab menu
export enum Tab {
  ADD_ELEMENTS = 0,
  EDIT = 1,
  CALCULATOR = 2,
  IMPORT = 3,
  EXPORT = 4,
  TEST = 5,
}

export const getTabName = (tab: Tab): string => {
  switch (tab) {
    case Tab.ADD_ELEMENTS: {
      return 'Add Elements'
    }
    case Tab.EDIT: {
      return 'Editor'
    }
    case Tab.CALCULATOR: {
      return 'Calculator'
    }
    case Tab.IMPORT: {
      return 'Import'
    }
    case Tab.EXPORT: {
      return 'Export'
    }
    case Tab.TEST: {
      return 'Test'
    }
    default: {
      return 'Unknown Tab'
    }
  }
}
