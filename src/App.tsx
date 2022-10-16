import React, { useEffect, useState } from 'react'
import AlertBlock from './common-components/AlertComponent'
import { AlertMessage, ErrorMessage } from './common/AlertMessageTypes'
import { AlertStack } from './context/AlertStack'
import { Model } from './context/Model'
import Settings from './context/Settings'
import ControlPanel from './control-panel/ControlPanelComponent'
import { Drawable } from './data-model/Interfaces'
import { Layer } from './data-model/Layer'
import { Point } from './data-model/Point'
import { Vector } from './data-model/Vector'
import DrawerPage from './drawer/DrawerPageComponent'
import VisualModel from './visual-components/VisualModelComponent'

// Context
export const SettingsContext = React.createContext(new Settings())
export const ModelContext = React.createContext(new Model())
export const AlertStackContext = React.createContext({
  stack: new AlertStack(),
  // We can create alert from anywhere using this callback
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  throwMessage: (message: AlertMessage) => {},
})

const App = () => {
  const alertDuration = 4000
  // Data model - all entities are stored here
  const [model, setModel] = useState<Model>(
    new Model(
      [],
      [],
      [
        new Layer('BaseLayer', 'white'),
        new Layer('RedLayer', 'red'),
        new Layer('GreenLayer', 'green'),
        new Layer('BlackLayer', 'black'),
        new Layer('OrangeLayer', 'orange'),
      ]
    )
  )

  const elements: Drawable[] = [...model.points, ...model.vectors]

  // Alerts
  const [alertStack, setAlertStack] = useState<AlertStack>(new AlertStack())
  const throwMessage = (message: AlertMessage) => {
    setAlertStack(alertStack.addMessage(message))
  }
  const ctxValue = { stack: alertStack, throwMessage: throwMessage }

  // Clear alert after set duration - if new alert arrives we renew the timer
  useEffect(() => {
    console.log('Stack changed')
    const timer = setTimeout(() => {
      if (alertStack.messages.length > 0) {
        setAlertStack(new AlertStack())
      }
    }, alertDuration)
    return () => {
      clearTimeout(timer)
    }
  }, [alertStack.messages.length])

  // Change model - exception may occure, so we catch them and put them in alerts
  const runModelChange = (prevModel: Model, setter: () => Model) => {
    try {
      return setter()
    } catch (e: unknown) {
      throwMessage(
        new ErrorMessage(
          e instanceof Error ? e.message : 'Unkown error occured'
        )
      )
      return prevModel
    }
  }

  const onAddPoint = (newPoints: Point[]) => {
    setModel((prevModel: Model) => {
      return runModelChange(prevModel, () => prevModel.addPoints(newPoints))
    })
  }

  const onAddVecor = (newVector: Vector[]) => {
    setModel((prevModel: Model) => {
      return runModelChange(prevModel, () => prevModel.addVectors(newVector))
    })
  }

  const onAddLayer = (newLayer: Layer[]) => {
    setModel((prevModel: Model) => {
      return runModelChange(prevModel, () => prevModel.addLayer(newLayer))
    })
  }

  // Left menu settings
  const [settings, setSettings] = useState<Settings>(new Settings())
  const handleAxisChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        return prevSettings.updateAxisSize(event.currentTarget.valueAsNumber)
      }
      return prevSettings
    })
  }

  const toggleAxis = () => {
    setSettings((prevSettings: Settings) => {
      return prevSettings.updateAxisToggled(!prevSettings.axisToggled)
    })
  }

  const handleTagSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        return prevSettings.updatePointTagsSize(
          event.currentTarget.valueAsNumber
        )
      }
      return prevSettings
    })
  }

  const toggleTags = () => {
    setSettings((prevSettings: Settings) => {
      return prevSettings.updatePointTagsToggled(!prevSettings.pointTagsToggled)
    })
  }

  const handlePointSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        return prevSettings.updatePointSize(event.currentTarget.valueAsNumber)
      }
      return prevSettings
    })
  }

  // Render
  return (
    <SettingsContext.Provider value={settings}>
      <ModelContext.Provider value={model}>
        <AlertStackContext.Provider value={ctxValue}>
          <React.StrictMode>
            <div className='page'>
              <h1 className='header'>Measure 3D</h1>

              <DrawerPage
                toggleAxis={toggleAxis}
                handleAxisChange={handleAxisChange}
                toggleTags={toggleTags}
                handleTagSizeChange={handleTagSizeChange}
                handlePointSizeChange={handlePointSizeChange}
              >
                <div className='pageContent'>
                  <div className='leftSide'>
                    <VisualModel elements={elements} />
                  </div>

                  <div className='rightSide'>
                    <ControlPanel
                      onAddPoint={onAddPoint}
                      onAddVector={onAddVecor}
                    />
                    <div className='ml-3 '>
                      {alertStack.messages.length > 0 && (
                        <AlertBlock
                          alerts={alertStack.messages}
                          duration={alertDuration}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </DrawerPage>
            </div>
          </React.StrictMode>
        </AlertStackContext.Provider>
      </ModelContext.Provider>
    </SettingsContext.Provider>
  )
}

export default App
