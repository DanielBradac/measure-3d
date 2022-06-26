import { useState } from 'react'
import { Point, Vector } from '../../data-model/Drawable'
import { Layer } from '../../data-model/Layer'
import AddPoint from './AddPointComponent'
import AddVector from './AddVectorComponent'

interface AddElementProps {
  points: Point[]
  layers: Layer[]
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

const AddElement = ({
  points,
  onAddPoint,
  onAddVector,
  layers,
}: AddElementProps) => {
  const [currentPanel, setCurrentPanel] = useState<string>('Point')

  const onChangeElement = (event: React.FormEvent<HTMLSelectElement>) => {
    setCurrentPanel(event.currentTarget.value)
  }

  const getPanel = (): JSX.Element => {
    if (currentPanel === 'Point') {
      return <AddPoint onAddPoint={onAddPoint} layers={layers} />
    }
    return (
      <AddVector
        onAddPoint={onAddPoint}
        onAddVector={onAddVector}
        points={points}
        layers={layers}
      />
    )
  }

  // Render
  return (
    <>
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
