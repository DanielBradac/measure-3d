import * as THREE from 'three'
import { Html } from '@react-three/drei'
import { Point } from '../data-model/Point'
import { InteractionCtx } from '../common/Types'

interface PointCompProps {
  point: Point
  radius: number
  showTag: boolean
  tagSize: number
  showPoint: boolean
  interactions: InteractionCtx
}

const PointComp = ({
  point,
  radius,
  showTag,
  tagSize,
  showPoint,
  interactions,
}: PointCompProps) => {
  const color = point.color || point.layers[0].color
  const center = [point.x, point.y, point.z]

  return (
    // Render
    <mesh position={new THREE.Vector3(...center)}>
      {showPoint && <sphereBufferGeometry args={[radius, 50, 50]} />}
      <meshBasicMaterial color={color} />
      {showTag && (
        <Html distanceFactor={5} position={[0.1, 0.1, 0]}>
          <div
            className='font-tag'
            style={{
              fontSize: tagSize,
              color: color,
              padding: radius * 200,
            }}
          >
            {point.tag}
          </div>
        </Html>
      )}
    </mesh>
  )
}

export default PointComp
