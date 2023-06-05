import { useContext } from 'react'
import { ModelContext } from '../../context/GlobalContextComponent'
import { indexOf } from '../../data-model/Interfaces'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'

const TestComp = () => {
  const { addPoint, addVector, model } = useContext(ModelContext)
  const { layers, points } = model

  const generateRandomPoints = () => {
    const newPoint = new Point(
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 2000).toString(),
      [layers[0]]
    )

    if (indexOf(points, newPoint) === -1) {
      addPoint(newPoint)
    }
  }

  const generateRandomVector = () => {
    if (points.length < 2) {
      return
    }
    const firstInx = Math.floor(Math.random() * (points.length - 1)) + 1
    addVector(new Vector(points[firstInx], points[firstInx - 1]))
  }

  // Render
  return (
    <div className='flex flex-col w-1/3 gap-y-3'>
      <button
        type='button'
        className='buttonPrimary'
        onClick={generateRandomPoints}
      >
        Random point
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
