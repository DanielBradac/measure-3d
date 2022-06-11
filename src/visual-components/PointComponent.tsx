import * as THREE from "three";
import { Color } from "three";
import { Html } from "@react-three/drei"
import './PointComponent.css'
import { serialize } from "v8";

interface PointComp {
    center: number[]
    radius: number
    color: string
    tag: string
}

const PointComp = ({ center, radius, color, tag}: PointComp) => {
    // Render
    return (
        <mesh position={new THREE.Vector3(...center)}>
            <sphereBufferGeometry args={[radius, 50, 50]} />
            <meshBasicMaterial color={color} />

            <Html distanceFactor={20}>
                <div className="tag" style={{fontSize : radius * 220, color: color}}>{tag}</div>
            </Html>
        </mesh>
    )
}


export default PointComp