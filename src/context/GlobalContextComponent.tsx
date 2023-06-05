import { createContext, ReactNode, StrictMode } from 'react'
import { AlertMessage } from '../common/AlertMessageTypes'
import { InteractionCtx } from '../common/Types'
import { Drawable } from '../data-model/Interfaces'
import InteractionModel from './InteractionModel'
import { Model } from './Model'
import Settings from './Settings'

// Context
export const SettingsContext = createContext(new Settings())
export const ModelContext = createContext(new Model())
export const InteractionContext = createContext<InteractionCtx>({
  // We provide a function to record interacion with element and model to check the record
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interact: (attrName: keyof InteractionModel, value: Drawable | null) => {},
  interModel: new InteractionModel(),
})
export const AlertContext = createContext(
  // We can create alert from anywhere using this callback
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_: AlertMessage) => {}
)

interface GlobalContextComponentProps {
  settingsProv: Settings
  modelProv: Model
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
