import * as THREE from 'three'
import { useLayoutEffect, useRef } from 'react'
import { Color, Mesh } from 'three'

interface VectorProps {
  start: number[]
  end: number[]
  color: string | Color
  showArrow: boolean
  arrowSize: number
}

const VectorComp = ({
  start,
  end,
  color,
  showArrow,
  arrowSize,
}: VectorProps) => {
  const line = useRef<THREE.Line>(null)

  useLayoutEffect(() => {
    if (line.current) {
      line.current.geometry.setFromPoints(
        [start, end].map(point => new THREE.Vector3(...point))
      )
    }
  }, [start, end, color])

  const dirVector = new THREE.Vector3(
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  )

  // Tilting of direction arrow
  const quat = new Mesh().quaternion.setFromUnitVectors(
    THREE.Object3D.DefaultUp,
    dirVector.clone().normalize()
  )
  const radius = 0.02 * arrowSize
  const height = 0.07 * arrowSize

  const startVec = new THREE.Vector3(...start)
  const endVec = new THREE.Vector3(...end)
  const arrPosition = new THREE.Vector3()

  arrPosition
    .subVectors(endVec, startVec)
    .multiplyScalar(1 - height / 2 / arrPosition.length())
    .add(startVec)

  // Render
  return (
    <>
      <line_ ref={line}>
        <bufferGeometry />
        <lineBasicMaterial color={color} />
      </line_>
      {showArrow && (
        <mesh position={arrPosition} quaternion={quat}>
          <coneBufferGeometry args={[radius, height, 64]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </>
  )
}

export default VectorComp
