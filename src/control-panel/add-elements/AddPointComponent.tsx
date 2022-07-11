import { useForm } from 'react-hook-form'
import { getLayerSelection } from '../../common/Selections'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'

interface AddPointProps {
  onAddPoint: (newPoint: Point[]) => void
  layers: Layer[]
}

const AddPoint = ({ onAddPoint, layers }: AddPointProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      x: 0,
      y: 0,
      z: 0,
      tag: '',

      layerIndex: 0,
    },
  })

  const addPoint = handleSubmit(data => {
    onAddPoint([
      new Point(data.x, data.y, data.z, data.tag, layers[data.layerIndex]),
    ])
    reset()
  })

  const generateRandomPoints = () => {
    const newPoints: Point[] = []
    for (let x = 0; x < 10; x++) {
      Math.floor(Math.random() * 11)
      newPoints.push(
        new Point(
          Math.floor(Math.random() * 11),
          Math.floor(Math.random() * 11),
          Math.floor(Math.random() * 11),
          x.toString(),
          layers[0]
        )
      )
    }
    onAddPoint(newPoints)
  }

  // Render

  return (
    <form onSubmit={addPoint} className='inputForm'>
      <div className='table-column inputBlock'>
        <div className='table-row'>
          <label className='table-cell itemLabel'>X:</label>
          <input
            {...register('x', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Y:</label>
          <input
            {...register('y', { required: true })}
            type='number'
            id='y'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Z:</label>
          <input
            {...register('z', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Tag:</label>

          <input
            {...register('tag')}
            type='string'
            id='tag'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell itemLabel'>Layer:</label>

          <select
            className='table-cell select select-bordered select-sm'
            {...register('layerIndex')}
          >
            {getLayerSelection(layers)}
          </select>
        </div>
      </div>

      <div className='submitButton'>
        <button type='submit' className='buttonOutline'>
          Add point
        </button>
      </div>
      <div>
        <button
          type='button'
          className='buttonOutline'
          onClick={generateRandomPoints}
        >
          10 random points
        </button>
      </div>
    </form>
  )
}

export default AddPoint
