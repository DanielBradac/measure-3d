import React, { useState } from 'react'
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

const App = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [vectors, setVectors] = useState<Vector[]>([])
  const [layers, setLayers] = useState<Layer[]>([
    new Layer('BaseLayer', 'white'),
    new Layer('RedLayer', 'red'),
    new Layer('GreenLayer', 'green'),
    new Layer('BlackLayer', 'black'),
    new Layer('OrangeLayer', 'orange'),
  ])
  const elements: Drawable[] = [...points, ...vectors]

  // TODO bod je identický, když má identické souřadnice a layer - identické body nepřidávat
  const onAddPoint = (newPoint: Point[]) => {
    setPoints([...points, ...newPoint])
  }

  // TODO vektor je identický, když má identický from a to nebo obráceně
  const onAddVecor = (newVector: Vector[]) => {
    setVectors([...vectors, ...newVector])
  }

  // TODO nepůjde příjdat layer se stejným názvem
  const onAddLayer = (newLayer: Layer[]) => {
    setLayers([...layers, ...newLayer])
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
      <h1 className='header'>Measure 3D</h1>
      <DrawerPage
        toggleAxis={toggleAxis}
        handleAxisChange={handleAxisChange}
        toggleTags={toggleTags}
        handleTagSizeChange={handleTagSizeChange}
        handlePointSizeChange={handlePointSizeChange}
      >
        <div className='pageContent'>
          <VisualModel elements={elements} />
          <ControlPanel
            points={points}
            vectors={vectors}
            onAddPoint={onAddPoint}
            onAddVector={onAddVecor}
            layers={layers}
          />
        </div>
      </DrawerPage>
    </SettingsContext.Provider>
  )
}

export default App
