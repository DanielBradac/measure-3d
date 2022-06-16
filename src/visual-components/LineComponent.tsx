import * as THREE from 'three'
import { useLayoutEffect, useRef } from 'react'
import { Color } from 'three'

interface LineProps {
  start: number[]
  end: number[]
  color: string | Color
}

const LineComp = ({ start, end, color }: LineProps) => {
  const line = useRef<THREE.Line>(null)

  useLayoutEffect(() => {
    if (line.current) {
      line.current.geometry.setFromPoints(
        [start, end].map(point => new THREE.Vector3(...point))
      )
    }
  }, [start, end, color])

  // Render
  return (
    <line_ ref={line}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line_>
  )
}

export default LineComp
