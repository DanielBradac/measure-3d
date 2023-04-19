import { useState } from 'react'
import AlertBlock from '../common-components/AlertComponent'
import { AlertMessage } from '../common/AlertMessageTypes'
import { alertDuration } from '../common/GlobalConstants'
import { Tab } from '../common/Types'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import AddElement from './add-elements/AddElementComponent'
import Calculator from './calculator/CalculatorComponent'
import Hint from './HintComponent'

interface ControlPanelProps {
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
  alertStack: AlertMessage[]
}

const ControlPanel = ({
  onAddPoint,
  onAddVector,
  alertStack,
}: ControlPanelProps) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.ADD_ELEMENTS)

  const getClasses = (tabIndex: Tab): string => {
    return selectedTab === tabIndex
      ? 'tab tab-active'
      : 'tab hover:animate-tabHover'
  }

  const getTabContent = (): JSX.Element => {
    switch (selectedTab) {
      case Tab.ADD_ELEMENTS: {
        return <AddElement onAddPoint={onAddPoint} onAddVector={onAddVector} />
      }
      case Tab.CALCULATOR: {
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
      <div className='flex flex-col overflow-auto h-full'>
        <div>
          <div className='tabs tabs-boxed'>
            <a
              className={getClasses(Tab.ADD_ELEMENTS)}
              onClick={() => {
                setSelectedTab(Tab.ADD_ELEMENTS)
              }}
            >
              Add Elements
            </a>
            <a
              className={getClasses(Tab.EDIT)}
              onClick={() => {
                setSelectedTab(Tab.EDIT)
              }}
            >
              Editor
            </a>
            <a
              className={getClasses(Tab.CALCULATOR)}
              onClick={() => {
                setSelectedTab(Tab.CALCULATOR)
              }}
            >
              Calculator
            </a>
            <a
              className={getClasses(Tab.IMPORT)}
              onClick={() => {
                setSelectedTab(Tab.IMPORT)
              }}
            >
              Import
            </a>
            <a
              className={getClasses(Tab.EXPORT)}
              onClick={() => {
                setSelectedTab(Tab.EXPORT)
              }}
            >
              Export
            </a>
          </div>
          <div className='tabContent'>{getTabContent()}</div>
        </div>
        <div className='ml-4'>
          {alertStack.length > 0 && (
            <AlertBlock alerts={alertStack} duration={alertDuration} />
          )}
        </div>
      </div>
      <Hint selectedTab={selectedTab} />
    </>
  )
}

export default ControlPanel
