import { Drawable } from '../data-model/Drawable';
import AddPoint from './AddPointComponent';
import './ControlPanelComponent.css';

interface ControlPanelProps {
    elements: Drawable[]
    onAddElement: (newElement: Drawable) => void
}

const ControlPanel = ({ onAddElement, elements }: ControlPanelProps) => {

    

    // Render
    return (
        <>
            <AddPoint onAddElement={onAddElement}/>
        </>
    )
}

export default ControlPanel