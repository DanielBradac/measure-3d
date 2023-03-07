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
import { Drawable } from '../data-model/Interfaces'
import {
  InteractionContext,
  SettingsContext,
} from '../context/GlobalContextComponent'

interface VisualModelProps {
  elements: Drawable[]
}

const VisualModel = ({ elements }: VisualModelProps) => {
  // Import context needed for drawing elements, interactions and messages for user
  const settings = useContext(SettingsContext)
  const interactions = useContext(InteractionContext)

  // Setup orbit controls
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

  // Setup canvas content from elements: Drawable[]
  const CanvasContent = () => {
    const { camera, mouse, scene } = useThree()
    // Existing drwables mapped on mesh nodes. Key = mesh.UUID, value = corresponding drawable
    const meshDrawableMap = useRef<Map<string | null, Drawable>>(
      new Map<string | null, Drawable>()
    )

    // Pointer over clickable elements
    const setHovered = (hovered: boolean) => {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }

    const clicked = (e: ThreeEvent<MouseEvent>) => {
      // Raycaster is setup to determine which clicked object is closest to the camera
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(scene)

      if (intersects.length > 0) {
        // Closest object to camera determined by raycaster
        const closestObject = intersects[0].object
        // Clicked object from event - if the closestObject is among event children, we have the one
        const clickedObject = e.eventObject.children.filter(
          child => child.uuid === closestObject.uuid
        )

        if (clickedObject.length === 1) {
          const clickedDrawable = meshDrawableMap.current.get(
            e.eventObject.uuid
          )
          // Record clicked drawable to context
          if (clickedDrawable) {
            interactions.interact('clicked', clickedDrawable)
          }
        }
      }
    }

    // Draw elements from model
    const toRender = elements.map((currElement, index) => {
      const mesh = (
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={e => clicked(e)}
          key={`mesh_${index}`}
          ref={node => {
            const key = (node && node.uuid) || null
            meshDrawableMap.current?.set(key, currElement)
          }}
        >
          {currElement.draw(index, settings, interactions)}
        </mesh>
      )
      return mesh
    })

    return <>{toRender}</>
  }

  // Are axis visible?
  const axis = settings.axisToggled ? (
    <primitive object={new THREE.AxesHelper(settings.axisSize)} />
  ) : (
    ''
  )

  // Render
  return (
    <>
      <div className=''>
        <label htmlFor='drawer' className='drawer-button'>
          <BsFillGearFill
            className='text-secondary m-2 cursor-pointer hover:animate-rotate-180 active:animate-click'
            size={32}
          />
        </label>
      </div>
      <div className='canvas'>
        <Canvas>
          {axis}
          <Controls />
          <CanvasContent />
        </Canvas>
      </div>
    </>
  )
}

export default VisualModel
