/* eslint-disable @typescript-eslint/no-namespace */
import { extend, ReactThreeFiber } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ControlPanel from './control-panel/ControlPanelComponent'
import { Drawable, Point, Vector } from './data-model/Drawable'
import { Layer } from './data-model/Layer'
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
  const [layers, setLayers] = useState<Layer[]>([
    new Layer('BaseLayer', 'white'),
    new Layer('RedLayer', 'red'),
    new Layer('GreenLayer', 'green'),
    new Layer('BlackLayer', 'black'),
    new Layer('OrangeLayer', 'orange'),
  ])

  // TODO bod je identický, když má identické souřadnice a layer - identické body nepřidávat
  const onAddPoint = (newPoint: Point[]) => {
    setPoints([...points, ...newPoint])
  }

  // TODO vektor je identický, když má identický from a to
  const onAddVecor = (newVector: Vector[]) => {
    setVectors([...vectors, ...newVector])
  }

  // TODO nepůjde příjdat layer se stejným názvem
  const onAddLayer = (newLayer: Layer[]) => {
    setLayers([...layers, ...newLayer])
  }

  const elements: Drawable[] = [...points, ...vectors]

  return (
    <>
      <div className='header'>
        <h1>Measure 3D</h1>
      </div>
      <div className='App'>
        <VisualModel elements={elements} />
        <ControlPanel
          points={points}
          onAddPoint={onAddPoint}
          onAddVector={onAddVecor}
          layers={layers}
        />
      </div>
    </>
  )
}

export default App
