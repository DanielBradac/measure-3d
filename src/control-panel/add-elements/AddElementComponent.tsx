// eslint-disable-next-line import/named
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  // eslint-disable-next-line import/named
  SelectChangeEvent,
} from '@mui/material'
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
  const [currentPanel, setCurrentPanel] = useState<string>('point')

  const handleChange = (event: SelectChangeEvent) => {
    setCurrentPanel(event.target.value)
  }

  const getPanel = (): JSX.Element => {
    if (currentPanel === 'point') {
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
      <InputLabel>Element</InputLabel>
      <Select label='Element' value={currentPanel} onChange={handleChange}>
        <MenuItem value='point'>Point</MenuItem>
        <MenuItem value='vector'>Vector</MenuItem>
      </Select>
      {getPanel()}
    </>
  )
}

export default AddElement
