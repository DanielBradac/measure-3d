import * as THREE from 'three'
import { Html } from '@react-three/drei'

interface PointCompProps {
  center: number[]
  radius: number
  color: string
  tag: string
  showTag: boolean
  tagSize: number
  showPoint: boolean
}

const PointComp = ({
  center,
  radius,
  color,
  tag,
  showTag,
  tagSize,
  showPoint,
}: PointCompProps) => {
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
            {tag}
          </div>
        </Html>
      )}
    </mesh>
  )
}

export default PointComp
