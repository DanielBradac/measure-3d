import { useState } from 'react'
import { Point, Vector } from '../../data-model/Drawable'
import AddPoint from './AddPointComponent'
import AddVector from './AddVectorComponent'

interface AddElementProps {
  points: Point[]
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

const AddElement = ({ points, onAddPoint, onAddVector }: AddElementProps) => {
  const [currentPanel, setCurrentPanel] = useState<string>('point')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPanel(event.currentTarget.value)
  }

  const getPanel = (): JSX.Element => {
    if (currentPanel === 'point') {
      return <AddPoint onAddPoint={onAddPoint} />
    }
    return (
      <AddVector
        onAddPoint={onAddPoint}
        onAddVector={onAddVector}
        points={points}
      />
    )
  }

  // Render
  return (
    <>
      <select onChange={handleChange}>
        <option value='point'>Point</option>
        <option value='vector'>Vector</option>
      </select>
      {getPanel()}
    </>
  )
}

export default AddElement
