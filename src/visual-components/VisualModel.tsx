import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Drawable, Point, Vector } from '../data-model/Drawable'
import './VisualModel.css';

import { useRef } from 'react';

interface VisualModelProps {
    elements: Drawable[]
}

const VisualModel = ({elements}: VisualModelProps) => {
    const Controls = () => {
        const controls = useRef<OrbitControls>(null);
        const { camera, gl } = useThree()

        useFrame(() => {
            controls.current!.update()
        });

        extend({ OrbitControls })
        // Render
        return (
            <orbitControls ref={controls} args={[camera, gl.domElement]}></orbitControls>
        );
    }

    // Render
    console.log(elements.length)
    const toRender = elements.map((currElement, index)=> currElement.draw(index))
    return (
        <div className="canvas">
            <Canvas>
                <Controls />
                {toRender}
            </Canvas>
        </div>
    )
}

/**
 * <LineComp start={[0.000, 0.000, 0.000]} end={[0.538,0.000,0.019]} color='black'/>
                    <LineComp start={[0.538,0.000,0.019]} end={[0.538,1.106,0.071]} color='black'/>
                    <LineComp start={[0.538,1.106,0.071]} end={[-0.010,1.106,0.047]} color='black'/>
                    <LineComp start={[-0.010,1.106,0.047]} end={[-0.010,0.007,0.007]} color='black'/>
                    <LineComp start={[-0.010,0.007,0.007]} end={[0.025,0.037,-0.697]} color='black'/>
                    <LineComp start={[0.025,0.037,-0.697]} end={[0.826,0.037,-0.732]} color='black'/>
                    <LineComp start={[0.826,0.037,-0.732]} end={[0.826,1.159,-0.646]} color='black'/>
                    <LineComp start={[0.826,1.159,-0.646]} end={[0.019,1.159,-0.629]} color='black'/>
 */


export default VisualModel
