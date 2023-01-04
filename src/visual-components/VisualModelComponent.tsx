import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useContext, useRef } from 'react'
import * as THREE from 'three'
import { BsFillGearFill } from 'react-icons/bs'
import { SettingsContext } from '../App'
import { Drawable } from '../data-model/Interfaces'
import SurfaceComp from './SurfaceComponent'
import { Vector3 } from 'three'

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
  const settings = useContext(SettingsContext)

  // Render
  const toRender = elements.map((currElement, index) =>
    currElement.draw(index, settings)
  )
  // Test
  toRender.push(<SurfaceComp vectors={[new Vector3(1, 2, 3)]} />)

  const axis = settings.axisToggled ? (
    <primitive object={new THREE.AxesHelper(settings.axisSize)} />
  ) : (
    ''
  )
  return (
    <>
      <label htmlFor='drawer' className='drawer-button'>
        <BsFillGearFill
          className='text-secondary m-2 cursor-pointer'
          size={32}
        />
      </label>

      <div className='canvas'>
        <Canvas>
          {axis}
          <Controls />
          {toRender}
        </Canvas>
      </div>
    </>
  )
}

export default VisualModel
