/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, StrictMode } from 'react'
import { AlertMessage } from '../common/AlertMessageTypes'
import { InteractionCtx, ModelCtx } from '../common/Types'
import { Drawable } from '../data-model/Interfaces'
import InteractionModel from './InteractionModel'
import { Model, ModelManager } from './Model'
import Settings from './Settings'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { Layer } from '../data-model/Layer'

// Context
export const SettingsContext = createContext(new Settings())
export const InteractionContext = createContext<InteractionCtx>({
  // We provide a function to record interacion with element and model to check the record
  interact: (attrName: keyof InteractionModel, value: Drawable | null) => {},
  interModel: new InteractionModel(),
})
export const ModelContext = createContext<ModelCtx>({
  model: new Model(),
  forward: () => {},
  backward: () => {},
  addPoint: (_: Point) => true,
  addVector: (_: Vector) => true,
  editPoint: (existingPoint: Point, newPoint: Point) => true,
  removePoint: (point: Point) => true,
  removeVector: (vector: Vector) => true,
  swapDirection: (vector: Vector) => true,
  removeLayer: (layer: Layer) => true,
})
export const AlertContext = createContext(
  // We can create alert from anywhere using this callback
  (_: AlertMessage) => {}
)

interface GlobalContextComponentProps {
  settingsProv: Settings
  modelProv: ModelCtx
  interactionProv: InteractionCtx
  alertProv: (_: AlertMessage) => void
  children: ReactNode
}

const GlobalContextComponent = ({
  settingsProv,
  modelProv,
  interactionProv,
  alertProv,
  children,
}: GlobalContextComponentProps) => {
  // Render
  return (
    <SettingsContext.Provider value={settingsProv}>
      <ModelContext.Provider value={modelProv}>
        <InteractionContext.Provider value={interactionProv}>
          <AlertContext.Provider value={alertProv}>
            <StrictMode>{children}</StrictMode>
          </AlertContext.Provider>
        </InteractionContext.Provider>
      </ModelContext.Provider>
    </SettingsContext.Provider>
  )
}

export default GlobalContextComponent
