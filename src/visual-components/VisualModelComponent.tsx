import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Drawable, Point, Vector } from '../data-model/Drawable'
import './VisualModelComponent.css'
import { Box, Drawer } from '@mui/material'

import React, { useRef, useState } from 'react'
import * as THREE from 'three'
import SettingsMenu from '../drawer/SettingsMenu'

interface VisualModelProps {
  elements: Drawable[]
}
const VisualModel = ({ elements }: VisualModelProps) => {
  const Controls = () => {
    const controls = useRef<OrbitControls>(null)
    const { camera, gl } = useThree()

    useFrame(() => {
      controls.current!.update()
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

  const [axisToggled, setAxisToggled] = useState<boolean>(false)
  const [axisSize, setAxisSize] = useState<number>(1)
  const handleAxisChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAxisSize(event.currentTarget.valueAsNumber)
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
      <div className='settings'>
        <SettingsMenu
          toggleAxis={() => {
            setAxisToggled(!axisToggled)
          }}
          handleAxisChange={handleAxisChange}
        />
      </div>

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
