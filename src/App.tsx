import { FormEvent, useEffect, useState } from 'react'
import { AlertMessage, ErrorMessage } from './common/AlertMessageTypes'
import GlobalContextComponent from './context/GlobalContextComponent'
import InteractionModel from './context/InteractionModel'
import { Model, ModelManager } from './context/Model'
import Settings from './context/Settings'
import ControlPanel from './control-panel/ControlPanelComponent'
import { Drawable } from './data-model/Interfaces'
import { Layer } from './data-model/Layer'
import { Point } from './data-model/Point'
import { Vector } from './data-model/Vector'
import DrawerPage from './settings-panel/DrawerPageComponent'
import VisualModel from './graphical-panel/VisualModelComponent'
// eslint-disable-next-line import/namespace
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { alertDuration } from './common/GlobalConstants'

const App = () => {
  // Data model - all entities are stored here
  //const [model, setModel] = useState<Model>(getDefaultModel())
  const [model, setModel] = useState<ModelManager>(new ModelManager())

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

  // Model functions
  const runModelChangeNew = (setter: () => Model): boolean => {
    try {
      const newVersion = setter()
      model.addVersion(newVersion)
      setModel(Object.create(model) as ModelManager)
      return true
    } catch (e: unknown) {
      throwMessage(
        new ErrorMessage(
          e instanceof Error ? e.message : 'Unkown error occured'
        )
      )
      return false
    }
  }

  const onForward = () => {
    model.forward()
    setModel(Object.create(model) as ModelManager)
  }

  const onBackward = () => {
    model.backward()
    setModel(Object.create(model) as ModelManager)
  }

  const onAddPoint = (newPoint: Point) => {
    return runModelChangeNew(() => model.currentModel().addPoint(newPoint))
  }
  const onAddVector = (newVector: Vector) => {
    return runModelChangeNew(() => model.currentModel().addVector(newVector))
  }
  const onEditPoint = (existingPoint: Point, newPoint: Point) => {
    return runModelChangeNew(() =>
      model.currentModel().editPoint(existingPoint, newPoint)
    )
  }
  const onRemovePoint = (removedPoint: Point) => {
    // TODO, tady to být nemůže, protože to nechceme dělat v případě výjimky
    interactWithElement('clicked', null)
    return runModelChangeNew(() =>
      model.currentModel().removePoint(removedPoint)
    )
  }
  const onRemoveVector = (removedVector: Vector) => {
    // TODO, tady to být nemůže, protože to nechceme dělat v případě výjimky
    interactWithElement('clicked', null)
    return runModelChangeNew(() =>
      model.currentModel().removeVector(removedVector)
    )
  }
  const onSwapDirection = (vector: Vector) => {
    return runModelChangeNew(() => model.currentModel().swapDirection(vector))
  }
  const onRemoveLayer = (layer: Layer) => {
    return runModelChangeNew(() => model.currentModel().removeLayer(layer))
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
      interactionProv={{
        interact: interactWithElement,
        interModel: interModel,
      }}
      alertProv={throwMessage}
      modelProv={{
        model: model.currentModel(),
        forward: onForward,
        backward: onBackward,
        addPoint: onAddPoint,
        addVector: onAddVector,
        editPoint: onEditPoint,
        removePoint: onRemovePoint,
        removeVector: onRemoveVector,
        swapDirection: onSwapDirection,
        removeLayer: onRemoveLayer,
      }}
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
                <VisualModel />
              </Allotment.Pane>
              <Allotment.Pane minSize={500}>
                <div className='rightSide'>
                  <ControlPanel alertStack={alertStack} />
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
