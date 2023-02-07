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
