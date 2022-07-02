import { useForm } from 'react-hook-form'
import { getLayerSelection } from '../../common/Selections'
import { Point } from '../../data-model/Drawable'
import { Layer } from '../../data-model/Layer'

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

  // Render

  return (
    <form onSubmit={addPoint} className='inputForm'>
      <div className='table-column inputBlock'>
        <div className='table-row'>
          <label className='table-cell label'>X:</label>
          <input
            {...register('x', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell label'>Y:</label>
          <input
            {...register('y', { required: true })}
            type='number'
            id='y'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell label'>Z:</label>
          <input
            {...register('z', { required: true })}
            type='number'
            id='x'
            step='0.001'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell label'>Tag:</label>

          <input
            {...register('tag')}
            type='string'
            id='tag'
            className='table-cell input input-bordered input-sm'
          />
        </div>

        <div className='table-row'>
          <label className='table-cell label'>Layer:</label>

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
    </form>
  )
}

export default AddPoint
