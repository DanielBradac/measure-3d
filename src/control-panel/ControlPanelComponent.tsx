import { useState } from 'react'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import AddElement from './add-elements/AddElementComponent'

interface ControlPanelProps {
  points: Point[]
  layers: Layer[]
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

const ControlPanel = ({
  onAddPoint,
  onAddVector,
  points,
  layers,
}: ControlPanelProps) => {
  const [tabValue, setTabValue] = useState<number>(0)

  const getClasses = (tabIndex: number): string => {
    return tabValue === tabIndex ? 'tab tab-active' : 'tab'
  }

  const getTabContent = (): JSX.Element => {
    switch (tabValue) {
      case 0: {
        return (
          <AddElement
            points={points}
            onAddPoint={onAddPoint}
            onAddVector={onAddVector}
            layers={layers}
          />
        )
      }
      default: {
        return <>Coming soon...</>
      }
    }
  }

  // Render
  return (
    <div className='controlPanel'>
      <div className='tabs tabs-boxed'>
        <a
          className={getClasses(0)}
          onClick={() => {
            setTabValue(0)
          }}
        >
          Elements
        </a>
        <a
          className={getClasses(1)}
          onClick={() => {
            setTabValue(1)
          }}
        >
          Layers
        </a>
        <a
          className={getClasses(2)}
          onClick={() => {
            setTabValue(2)
          }}
        >
          Measure
        </a>
      </div>
      <div className='tabContent'>{getTabContent()}</div>
    </div>
  )
}

export default ControlPanel
