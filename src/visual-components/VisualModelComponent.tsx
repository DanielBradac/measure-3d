import {
  Canvas,
  extend,
  useThree,
  useFrame,
  // eslint-disable-next-line import/named
  ThreeEvent,
} from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useContext, useRef } from 'react'
import * as THREE from 'three'
import { BsFillGearFill } from 'react-icons/bs'
import { InteractionContext, SettingsContext } from '../App'
import { Drawable } from '../data-model/Interfaces'
import { BufferGeometry, Mesh, Scene } from 'three'

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
  // Import context needed for drawing elements
  const settings = useContext(SettingsContext)
  const interactions = useContext(InteractionContext)

  // Are axis visible?
  const axis = settings.axisToggled ? (
    <primitive object={new THREE.AxesHelper(settings.axisSize)} />
  ) : (
    ''
  )

  /// TODO je tu potřeba nějak mít refs na mash a s každou mash mít prolinkovany Drawable - nějak přes mapu?
  const meshes = useRef<(Mesh | null)[]>([])
  //const meshMap = useRef<Map<Mesh | null, Drawable>(new Map()[])

  const clicked = (e: ThreeEvent<MouseEvent>) => {
    console.log(e.eventObject)
    const ref = meshes.current.filter(elem => elem?.uuid === e.eventObject.uuid)
    console.log(ref.length)
  }

  // Draw elements from model
  const toRender = elements.map((currElement, index) => {
    const mesh = (
      <mesh
        onClick={e => clicked(e)}
        key={`mesh_${index}`}
        ref={element => meshes.current?.push(element)}
      >
        {currElement.draw(index, settings, interactions)}
      </mesh>
    )

    return mesh
  })

  // Render
  return (
    <>
      <label htmlFor='drawer' className='drawer-button'>
        <BsFillGearFill
          className='text-secondary m-2 cursor-pointer hover:animate-rotate-180 active:animate-click'
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
