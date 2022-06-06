import { extend, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './App.css';
import VisualModel from './visual-model/VisualModel';

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
  return (
    <div className="App">
      <header className="App-header">
      <VisualModel />
      </header>
    </div>
  );
}

export default App;
