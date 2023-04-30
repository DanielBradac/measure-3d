import { useState } from 'react'
import AlertBlock from '../common-components/AlertComponent'
import { AlertMessage } from '../common/AlertMessageTypes'
import { alertDuration } from '../common/GlobalConstants'
import { getTabName, Tab } from '../common/Types'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import AddElement from './add-elements/AddElementComponent'
import Calculator from './calculator/CalculatorComponent'
import Editor from './editor/EditorComponent'
import Hint from './HintComponent'
import TestComp from './test/TestComponent'

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

  const getTabClass = (tabIndex: Tab): string => {
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
      case Tab.EDIT: {
        return <Editor />
      }
      case Tab.TEST: {
        return <TestComp onAddPoint={onAddPoint} />
      }
      default: {
        return <>Coming soon...</>
      }
    }
  }

  interface TabProps {
    tab: Tab
  }
  const TabItem = ({ tab }: TabProps) => {
    return (
      <a
        className={getTabClass(tab)}
        onClick={() => {
          setSelectedTab(tab)
        }}
      >
        {getTabName(tab)}
      </a>
    )
  }

  // Render
  return (
    <>
      <div className='flex flex-col overflow-auto h-full'>
        <div>
          <div className='tabs tabs-boxed'>
            <TabItem tab={Tab.ADD_ELEMENTS} />
            <TabItem tab={Tab.EDIT} />
            <TabItem tab={Tab.CALCULATOR} />
            <TabItem tab={Tab.IMPORT} />
            <TabItem tab={Tab.EXPORT} />
            <TabItem tab={Tab.TEST} />
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
