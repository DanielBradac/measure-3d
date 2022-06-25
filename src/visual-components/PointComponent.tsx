import * as THREE from 'three'
import { Html } from '@react-three/drei'

interface PointCompProps {
  center: number[]
  radius: number
  color: string
  tag: string
}

const PointComp = ({ center, radius, color, tag }: PointCompProps) => (
  // Render
  <mesh position={new THREE.Vector3(...center)}>
    <sphereBufferGeometry args={[radius, 50, 50]} />
    <meshBasicMaterial color={color} />

    <Html distanceFactor={20}>
      <div className='tag' style={{ fontSize: radius * 220, color: color }}>
        {tag}
      </div>
    </Html>
  </mesh>
)

export default PointComp
