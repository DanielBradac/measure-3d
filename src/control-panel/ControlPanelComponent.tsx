import { useState } from 'react'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import AddElement from './add-elements/AddElementComponent'
import Calculator from './calculator/CalculatorComponent'

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
      case 1: {
        return <Calculator />
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
          Calculator
        </a>
        <a
          className={getClasses(2)}
          onClick={() => {
            setTabValue(2)
          }}
        >
          Import
        </a>
        <a
          className={getClasses(3)}
          onClick={() => {
            setTabValue(3)
          }}
        >
          Export
        </a>
      </div>
      <div className='tabContent'>{getTabContent()}</div>
    </>
  )
}

export default ControlPanel
