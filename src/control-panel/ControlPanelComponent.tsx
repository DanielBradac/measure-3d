import { Tab, Tabs } from '@mui/material'
import React, { ReactNode } from 'react'
import { Point, Vector } from '../data-model/Drawable'
import AddPoint from './AddPointComponent'
import AddVector from './AddVectorComponent'
import './ControlPanelComponent.css'

interface ControlPanelProps {
  points: Point[]
  vectors: Vector[]
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

interface TabPanelProps {
  value: number
  index: number
  children: ReactNode
}

const TabPanel = ({ value, children, index }: TabPanelProps) => {
  return <div hidden={value !== index}>{children}</div>
}

const ControlPanel = ({
  onAddPoint,
  onAddVector,
  points,
  vectors,
}: ControlPanelProps) => {
  const [tabValue, setTabValue] = React.useState(0)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  // Render
  return (
    <div className='controlPanel'>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label='Add elements' value={0} />
        <Tab label='Measure' value={1} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <AddPoint onAddPoint={onAddPoint} />
        <AddVector onAddPoint={onAddPoint} onAddVector={onAddVector} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Coming Soon...
      </TabPanel>
    </div>
  )
}

export default ControlPanel
