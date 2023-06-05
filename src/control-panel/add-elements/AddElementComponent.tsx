import { FormEvent, useState } from 'react'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'
import AddPoint from './AddPointComponent'
import AddVector from './AddVectorComponent'
import ModelVersionNavigation from '../../common-components/ModelVersionNavigationComponent'

interface AddElementProps {
  onAddPoint: (newPoint: Point) => void
  onAddVector: (newVector: Vector) => void
}

const AddElement = ({ onAddPoint, onAddVector }: AddElementProps) => {
  const [currentPanel, setCurrentPanel] = useState<string>('Point')

  const onChangeElement = (event: FormEvent<HTMLSelectElement>) => {
    setCurrentPanel(event.currentTarget.value)
  }

  const getPanel = (): JSX.Element => {
    if (currentPanel === 'Point') {
      return <AddPoint onAddPoint={onAddPoint} />
    }
    return <AddVector onAddVector={onAddVector} />
  }

  // Render
  return (
    <>
      <div className='pb-5'>
        <ModelVersionNavigation />
      </div>

      <select
        className='select select-bordered w-full max-w-xs'
        onChange={onChangeElement}
      >
        <option>Point</option>
        <option>Vector</option>
      </select>
      {getPanel()}
    </>
  )
}

export default AddElement
