import { Drawable, Point, Vector } from '../data-model/Drawable';
import AddPoint from './AddPointComponent';
import AddVector from './AddVectorComponent';
import './ControlPanelComponent.css';

interface ControlPanelProps {
    points: Point[]
    vectors: Vector[]
    onAddPoint: (newPoint: Point[]) => void
    onAddVector: (newVector: Vector[]) => void
}

const ControlPanel = ({ onAddPoint, onAddVector, points, vectors }: ControlPanelProps) => {

    // Render
    return (
        <>
            <AddPoint onAddPoint={onAddPoint}/>
            <AddVector onAddPoint={onAddPoint} onAddVector = {onAddVector}/>
        </>
    )
}

export default ControlPanel