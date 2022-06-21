import { Tab, Tabs } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { Point, Vector } from '../data-model/Drawable'
import AddElement from './add-elements/AddElementComponent'
import './ControlPanelComponent.css'

interface ControlPanelProps {
  points: Point[]
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
}: ControlPanelProps) => {
  const [tabValue, setTabValue] = useState<number>(0)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  // Render
  return (
    <div className='controlPanel'>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label='Add elements' value={0} />
        <Tab label='Layers' value={1} />
        <Tab label='Measure' value={2} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <AddElement
          points={points}
          onAddPoint={onAddPoint}
          onAddVector={onAddVector}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Coming Soon...
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Coming Soon...
      </TabPanel>
    </div>
  )
}

export default ControlPanel
