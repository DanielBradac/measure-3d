import * as THREE from 'three'
import { Html } from '@react-three/drei'

interface PointCompProps {
  center: number[]
  radius: number
  color: string
  tag: string
  showTag: boolean
  tagSize: number
}

const PointComp = ({
  center,
  radius,
  color,
  tag,
  showTag,
  tagSize,
}: PointCompProps) => {
  return (
    // Render
    <mesh position={new THREE.Vector3(...center)}>
      <sphereBufferGeometry args={[radius, 50, 50]} />
      <meshBasicMaterial color={color} />
      {showTag && (
        <Html distanceFactor={5}>
          <div
            className='tag'
            style={{ fontSize: radius * tagSize * 100, color: color }}
          >
            {tag}
          </div>
        </Html>
      )}
    </mesh>
  )
}

export default PointComp
