import { extend, ReactThreeFiber } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import ControlPanel from './control-panel/ControlPanel';
import { Drawable, Point } from './data-model/Drawable';
import VisualModel from './visual-components/VisualModel';

// Global JSX declarations
extend({ Line_: THREE.Line })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>,
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
    }
  }
}

const App = () => {

  const [elements, setElements] = useState<Drawable[]>([new Point(1, 0, 0, 'black')])

  const onChangeColor = (): void => {
    const newElements = [...elements]
    newElements[0] = new Point(1, 0, 0, 'blue')
    setElements(elements)
  }

  return (
    <div className="App">
      <header className="App-header">
        <VisualModel elements={elements} />
        <ControlPanel onChangeColor={onChangeColor} />
      </header>
    </div>
  );
}

export default App;
