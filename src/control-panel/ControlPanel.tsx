import './ControlPanel.css';

interface ControlPanelProps {
    onChangeColor: () => void
}

const ControlPanel = ({ onChangeColor }: ControlPanelProps) => {

    // Render
    return (
        <button className="changeEnviromentButton" onClick={onChangeColor}>Change color</button>
    )
}

export default ControlPanel