import { useState } from 'react'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import AddElement from './add-elements/AddElementComponent'

interface ControlPanelProps {
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

const ControlPanel = ({ onAddPoint, onAddVector }: ControlPanelProps) => {
  const [tabValue, setTabValue] = useState<number>(0)

  const getClasses = (tabIndex: number): string => {
    return tabValue === tabIndex ? 'tab tab-active' : 'tab'
  }

  const getTabContent = (): JSX.Element => {
    switch (tabValue) {
      case 0: {
        return <AddElement onAddPoint={onAddPoint} onAddVector={onAddVector} />
      }
      default: {
        return <>Coming soon...</>
      }
    }
  }

  // Render
  return (
    <>
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
    </>
  )
}

export default ControlPanel
