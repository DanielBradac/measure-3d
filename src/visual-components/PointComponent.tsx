import * as THREE from "three";
import { useLayoutEffect, useRef } from 'react';
import { Color } from "three";
import { Html } from "@react-three/drei"

interface PointComp {
    center: number[]
    radius: number
    color: string | Color
}

const PointComp = ({ center, radius, color, }: PointComp) => {

    // Render
    return (
        <mesh position={new THREE.Vector3(...center)}>
            <sphereBufferGeometry args={[radius, 50, 50]} />
            <meshBasicMaterial color={color} />

            <Html distanceFactor={7}>
                <div>X</div>
            </Html>
        </mesh>
    )
}

export default PointComp