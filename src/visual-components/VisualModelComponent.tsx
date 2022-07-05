import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Drawable } from '../data-model/Drawable'

import { useContext, useRef, useState } from 'react'
import * as THREE from 'three'
import { BsFillGearFill } from 'react-icons/bs'
import { SettingsContext } from '../App'

interface VisualModelProps {
  elements: Drawable[]
}
const VisualModel = ({ elements }: VisualModelProps) => {
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

  // Import global settings
  const { axisToggled, axisSize } = useContext(SettingsContext)
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
        <BsFillGearFill className='text-secondary m-2 clickable' size={32} />
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
