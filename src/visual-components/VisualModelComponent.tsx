import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Drawable, Point, Vector } from '../data-model/Drawable'
import './VisualModelComponent.css';

import React, { useRef, useState } from 'react';
import * as THREE from 'three';

interface VisualModelProps {
    elements: Drawable[]
}

const VisualModel = ({ elements }: VisualModelProps) => {
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

    const [axisToggled, setAxisToggled] = useState<boolean>(false)
    const [axisSize, setAxisSize] = useState<number>(1)
    const handleAxisChange = (event: React.FormEvent<HTMLInputElement>) => {
        setAxisSize(event.currentTarget.valueAsNumber)
    }

    // Render
    const toRender = elements.map((currElement, index) => currElement.draw(index))
    const axis = axisToggled ? <primitive object={new THREE.AxesHelper(axisSize)} /> : ""
    return (
        <>
            <span>
                <label>Axis size:</label>
                <input
                    type="range"
                    min="0" max="10"
                    value={axisSize}
                    onChange={handleAxisChange}
                    step="0.1" />
                <button onClick={() => { setAxisToggled(!axisToggled) }}>Toggle axis</button>
            </span>
            <div className="canvas">
                <Canvas>
                    {axis}
                    <Controls />
                    {toRender}
                </Canvas>
            </div>
        </>
    )
}


export default VisualModel
