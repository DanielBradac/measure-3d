import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Drawable, Point, Vector } from '../data-model/Drawable'
import './VisualModelComponent.css';

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


export default VisualModel
