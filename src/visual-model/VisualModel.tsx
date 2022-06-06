import {Canvas,extend,useThree,useFrame  } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { useRef } from 'react';
import Line from './Line';
  
const VisualModel = () => {
    const Controls = () => {
        const controls = useRef<OrbitControls>(null);
        const {camera,gl} = useThree();
    
        useFrame(() => {
            controls.current!.update()
        });
        
        // Render
        extend({OrbitControls})
        return (
            <orbitControls ref={controls} args={[camera,gl.domElement]}></orbitControls>
        );
    }

    // Render
    return (
        <div>
            <Canvas>
                <mesh>
                <Controls />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Line start={[0.000, 0.000, 0.000]} end={[0.538,0.000,0.019]} color='black'/>
                    <Line start={[0.538,0.000,0.019]} end={[0.538,1.106,0.071]} color='black'/>
                    <Line start={[0.538,1.106,0.071]} end={[-0.010,1.106,0.047]} color='black'/>
                    <Line start={[-0.010,1.106,0.047]} end={[-0.010,0.007,0.007]} color='black'/>
                    <Line start={[-0.010,0.007,0.007]} end={[0.025,0.037,-0.697]} color='black'/>
                    <Line start={[0.025,0.037,-0.697]} end={[0.826,0.037,-0.732]} color='black'/>
                    <Line start={[0.826,0.037,-0.732]} end={[0.826,1.159,-0.646]} color='black'/>
                    <Line start={[0.826,1.159,-0.646]} end={[0.019,1.159,-0.629]} color='black'/>
                    <Line start={[0.019,1.159,-0.629]} end={[0.019,0.067,-0.683]} color='black'/>
                </mesh>
            </Canvas>
        </div>
    )
}

export default VisualModel
