import { FormEvent, useEffect, useState } from 'react'
import { AlertMessage, ErrorMessage } from './common/AlertMessageTypes'
import GlobalContextComponent from './context/GlobalContextComponent'
import InteractionModel from './context/InteractionModel'
import { Model } from './context/Model'
import Settings from './context/Settings'
import ControlPanel from './control-panel/ControlPanelComponent'
import { Drawable } from './data-model/Interfaces'
import { Layer } from './data-model/Layer'
import { Point } from './data-model/Point'
import { Vector } from './data-model/Vector'
import DrawerPage from './drawer/DrawerPageComponent'
import { getDeafaultModel } from './test-data/TestData'
import VisualModel from './visual-components/VisualModelComponent'
// eslint-disable-next-line import/namespace
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { alertDuration } from './common/GlobalConstants'

const App = () => {
  // Data model - all entities are stored here
  const [model, setModel] = useState<Model>(getDeafaultModel())

  // Interaction model - keeps track of how user interacts with elements (clicks, doubleclicks, etc.)
  const [interModel, setInterModel] = useState<InteractionModel>(
    new InteractionModel()
  )
  const interactWithElement = (
    interactionType: keyof InteractionModel,
    element: Drawable | null
  ) => {
    setInterModel((prevModel: InteractionModel) => {
      return prevModel.update(interactionType, element)
    })
  }

  // Alerts - throw message enables show messages across all components
  const [alertStack, setAlertStack] = useState<AlertMessage[]>([])
  const throwMessage = (message: AlertMessage) => {
    setAlertStack((prevStack: AlertMessage[]) => {
      return [message, ...prevStack]
    })
  }

  // Clear alert after set duration - if new alert arrives we renew the timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (alertStack.length > 0) {
        setAlertStack([])
      }
    }, alertDuration)
    return () => {
      clearTimeout(timer)
    }
  }, [alertStack.length])

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
  const handleAxisChange = (event: FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        const value = event.currentTarget.valueAsNumber
        return prevSettings.update('axisSize', value)
      }
      return prevSettings
    })
  }

  const toggleAxis = () => {
    setSettings((prevSettings: Settings) => {
      const value = !prevSettings.axisToggled
      return prevSettings.update('axisToggled', value)
    })
  }

  const handleTagSizeChange = (event: FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        const value = event.currentTarget.valueAsNumber
        return prevSettings.update('pointTagsSize', value)
      }
      return prevSettings
    })
  }

  const toggleTags = () => {
    setSettings((prevSettings: Settings) => {
      const value = !prevSettings.pointTagsToggled
      return prevSettings.update('pointTagsToggled', value)
    })
  }

  const togglePoints = () => {
    setSettings((prevSettings: Settings) => {
      const value = !prevSettings.pointsToggled
      return prevSettings.update('pointsToggled', value)
    })
  }

  const handlePointSizeChange = (event: FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        const value = event.currentTarget.valueAsNumber
        return prevSettings.update('pointSize', value)
      }
      return prevSettings
    })
  }

  const toggleArrows = () => {
    setSettings((prevSettings: Settings) => {
      const value = !prevSettings.arrowsToggled
      return prevSettings.update('arrowsToggled', value)
    })
  }

  const handleArrowSizeChange = (event: FormEvent<HTMLInputElement>) => {
    setSettings((prevSettings: Settings) => {
      if (event.currentTarget) {
        const value = event.currentTarget.valueAsNumber
        return prevSettings.update('arrowSize', value)
      }
      return prevSettings
    })
  }

  // Render
  return (
    <GlobalContextComponent
      settingsProv={settings}
      modelProv={model}
      interactionProv={{
        interact: interactWithElement,
        interModel: interModel,
      }}
      alertProv={throwMessage}
    >
      <div className='h-screen w-screen text-black bg-slate-600 font-main text-lg'>
        <DrawerPage
          toggleAxis={toggleAxis}
          handleAxisChange={handleAxisChange}
          toggleTags={toggleTags}
          handleTagSizeChange={handleTagSizeChange}
          handlePointSizeChange={handlePointSizeChange}
          togglePoints={togglePoints}
          toggleArrows={toggleArrows}
          handleArrowSizeChange={handleArrowSizeChange}
        >
          <div className='h-full w-full flex flex-row'>
            <Allotment>
              <Allotment.Pane minSize={500}>
                <VisualModel elements={[...model.points, ...model.vectors]} />
              </Allotment.Pane>
              <Allotment.Pane minSize={500}>
                <div className='rightSide'>
                  <ControlPanel
                    onAddPoint={onAddPoint}
                    onAddVector={onAddVecor}
                    alertStack={alertStack}
                  />
                </div>
              </Allotment.Pane>
            </Allotment>
          </div>
        </DrawerPage>
      </div>
    </GlobalContextComponent>
  )
}

export default App
