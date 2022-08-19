import React, { useEffect, useState } from 'react'
import Alert from './common-components/AlertComponent'
import { AlertMes, AlertType } from './common/Types'
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
  const [alert, setAlert] = useState<AlertMes | null>(null)

  // Clear alert after set duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(null)
    }, alertDuration)
    // To keep only one timeout running
    return () => {
      clearTimeout(timer)
    }
  }, [alert])

  const runModelChange = (prevModel: Model, setter: () => Model) => {
    try {
      return setter()
    } catch (e: unknown) {
      if (alert === null) {
        setAlert({
          type: AlertType.ERROR,
          message: e instanceof Error ? e.message : 'Unknown error occured',
        })
      } else {
        setAlert({
          type: AlertType.ERROR,
          message:
            alert.message +
            '\n' +
            (e instanceof Error ? e.message : 'Unknown error occured'),
        })
      }
      return prevModel
    }
  }

  // TODO chytat exceptiony a dát to do nějaké hezké chybové hlášky
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
                  {alert && (
                    <Alert
                      type={alert.type}
                      message={alert.message}
                      duration={alertDuration}
                    />
                  )}
                </div>
              </div>
            </div>
          </DrawerPage>
        </div>
      </ModelContext.Provider>
    </SettingsContext.Provider>
  )
}

export default App
