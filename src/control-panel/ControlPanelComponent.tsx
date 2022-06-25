import { Tab, Tabs } from '@mui/material'
import React, { ReactNode, useState } from 'react'
import { Point, Vector } from '../data-model/Drawable'
import { Layer } from '../data-model/Layer'
import AddElement from './add-elements/AddElementComponent'

interface ControlPanelProps {
  points: Point[]
  layers: Layer[]
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
  layers,
}: ControlPanelProps) => {
  const [tabValue, setTabValue] = useState<number>(0)

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  // Render
  return (
    <div className='controlPanel'>
      <Tabs
        value={tabValue}
        onChange={handleChange}
        className='tabRow'
        TabIndicatorProps={{ className: 'tabSelected' }}
      >
        <Tab label='Add elements' value={0} className='tab' />
        <Tab label='Layers' value={1} className='tab' />
        <Tab label='Measure' value={2} className='tab' />
      </Tabs>
      <div className='tabContent'>
        <TabPanel value={tabValue} index={0}>
          <AddElement
            points={points}
            onAddPoint={onAddPoint}
            onAddVector={onAddVector}
            layers={layers}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Coming Soon...
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Coming Soon...
        </TabPanel>
      </div>
    </div>
  )
}

export default ControlPanel
