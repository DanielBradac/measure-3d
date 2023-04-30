import { useContext } from 'react'
import { ModelContext } from '../../context/GlobalContextComponent'
import { indexOf } from '../../data-model/Interfaces'
import { Point } from '../../data-model/Point'

interface TestCompProps {
  onAddPoint: (newPoint: Point[]) => void
}

const TestComp = ({ onAddPoint }: TestCompProps) => {
  const { layers, points } = useContext(ModelContext)

  const generateRandomPoints = () => {
    const newPoints: Point[] = []
    for (let x = 0; x < 10; x++) {
      const newPoint = new Point(
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 20),
        x.toString(),
        [layers[0]]
      )
      if (indexOf(points, newPoint) === -1) {
        newPoints.push(newPoint)
      }
    }
    onAddPoint(newPoints)
  }
  // Render
  return (
    <div>
      <button
        type='button'
        className='buttonOutline'
        onClick={generateRandomPoints}
      >
        10 random points
      </button>
    </div>
  )
}

export default TestComp
