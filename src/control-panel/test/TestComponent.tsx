import { useContext } from 'react'
import { ModelContext } from '../../context/GlobalContextComponent'
import { indexOf } from '../../data-model/Interfaces'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'

interface TestCompProps {
  onAddPoint: (newPoint: Point[]) => void
  onAddVector: (newVector: Vector[]) => void
}

const TestComp = ({ onAddPoint, onAddVector }: TestCompProps) => {
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

  const generateRandomVector = () => {
    if (points.length < 2) {
      return
    }
    const firstInx = Math.floor(Math.random() * (points.length - 1)) + 1
    onAddVector([new Vector(points[firstInx], points[firstInx - 1])])
  }

  // Render
  return (
    <div className='flex flex-col w-1/3 gap-y-3'>
      <button
        type='button'
        className='buttonPrimary'
        onClick={generateRandomPoints}
      >
        10 random points
      </button>

      <button
        type='button'
        className='buttonPrimary'
        onClick={generateRandomVector}
      >
        Random Vector
      </button>
    </div>
  )
}

export default TestComp
