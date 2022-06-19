/* eslint-disable @typescript-eslint/no-namespace */
import { extend, ReactThreeFiber } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import './App.css'
import ControlPanel from './control-panel/ControlPanelComponent'
import { Drawable, Point, Vector } from './data-model/Drawable'
import VisualModel from './visual-components/VisualModelComponent'

// Global JSX declarations
extend({ Line_: THREE.Line })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
    }
  }
}

const App = () => {
  const [points, setPoints] = useState<Point[]>([])
  const [vectors, setVectors] = useState<Vector[]>([])

  const onAddPoint = (newPoint: Point[]) => {
    setPoints([...points, ...newPoint])
  }

  const onAddVecor = (newVector: Vector[]) => {
    setVectors([...vectors, ...newVector])
  }

  const elements: Drawable[] = [...points, ...vectors]

  return (
    <>
      <div className='header'>
        <h2>Measure 3D</h2>
      </div>
      <div className='App'>
        <VisualModel elements={elements} />
        <ControlPanel
          points={points}
          vectors={vectors}
          onAddPoint={onAddPoint}
          onAddVector={onAddVecor}
        />
      </div>
    </>
  )
}

export default App
