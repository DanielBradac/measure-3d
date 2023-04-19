import InteractionModel from '../context/InteractionModel'
import { Drawable } from '../data-model/Interfaces'

export type SelectOption = {
  value: string | number | readonly string[] | undefined
  label: string
}

export type InteractionCtx = {
  interact: (attrName: keyof InteractionModel, value: Drawable) => void
  interModel: InteractionModel
}

export enum Tab {
  ADD_ELEMENTS = 0,
  EDIT = 1,
  CALCULATOR = 2,
  IMPORT = 3,
  EXPORT = 4,
}
