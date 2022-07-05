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
  console.log(radius * 100 + tagSize)
  return (
    // Render
    <mesh position={new THREE.Vector3(...center)}>
      <sphereBufferGeometry args={[radius, 50, 50]} />
      <meshBasicMaterial color={color} />
      {showTag && (
        <Html distanceFactor={5}>
          <div
            className='tag'
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
