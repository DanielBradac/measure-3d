import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Drawable } from '../data-model/Drawable'

import { useRef } from 'react'
import { FaBeer } from 'react-icons/fa'
import * as THREE from 'three'
import { RiSettings3Fill } from 'react-icons/ri'

interface VisualModelProps {
  elements: Drawable[]
  axisToggled: boolean
  axisSize: number
}
const VisualModel = ({ elements, axisToggled, axisSize }: VisualModelProps) => {
  const Controls = () => {
    const controls = useRef<OrbitControls>(null)
    const { camera, gl } = useThree()

    useFrame(() => {
      controls.current?.update()
    })

    extend({ OrbitControls })
    // Render
    return (
      <orbitControls
        ref={controls}
        args={[camera, gl.domElement]}
      ></orbitControls>
    )
  }

  // Render
  const toRender = elements.map((currElement, index) => currElement.draw(index))
  const axis = axisToggled ? (
    <primitive object={new THREE.AxesHelper(axisSize)} />
  ) : (
    ''
  )
  return (
    <div className='visual-model'>
      <label htmlFor='drawer' className='drawer-button'>
        <RiSettings3Fill className='iconPrimary clickable' size={32} />
      </label>

      <div className='canvas'>
        <Canvas>
          {axis}
          <Controls />
          {toRender}
        </Canvas>
      </div>
    </div>
  )
}

export default VisualModel
