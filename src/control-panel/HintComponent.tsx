import { ReactNode } from 'react'
import { FiHelpCircle } from 'react-icons/fi'
import { Tab } from '../common/Types'

interface HintProps {
  selectedTab: Tab
}

const Hint = ({ selectedTab }: HintProps) => {
  const getHintContent = (): ReactNode => {
    switch (selectedTab) {
      case Tab.ADD_ELEMENTS: {
        return <div>Elements hint</div>
      }
      case Tab.EDIT: {
        return <div>Editor hint</div>
      }
      case Tab.CALCULATOR: {
        return <div>Calculator hint</div>
      }
      case Tab.IMPORT: {
        return <div>Import hint</div>
      }
      case Tab.EXPORT: {
        return <div>Export hint</div>
      }
    }
  }
  //Render
  return (
    <div className='hint'>
      <input type='checkbox' />
      <div className='collapse-title'>
        <span>
          <FiHelpCircle className='inline pr-1 pb-1' size={22} />
        </span>
        Hint
      </div>
      <div className='collapse-content pl-4 overflow-auto'>
        {getHintContent()}
      </div>
    </div>
  )
}

export default Hint
