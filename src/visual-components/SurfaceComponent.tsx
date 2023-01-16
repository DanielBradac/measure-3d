import { Vector3 } from 'three'
import { Earcut } from 'three/src/extras/Earcut'

interface SurfaceProps {
  vectors: Vector3[]
}

const SurfaceComp = ({ vectors }: SurfaceProps) => {
  const vertices = [1, 1, 0, 1, 3, 0, 3, 1, 0, 3, 3, 0]

  Earcut.triangulate(vertices, [], 3)

  // Render
  return (
    /*
    <mesh geometry={geometry}>
      <meshBasicMaterial color={'blue'} side={THREE.DoubleSide} />
    </mesh>
    */
    <></>
  )
}

export default SurfaceComp
