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
  // TODO předělat tak, aby se to poskládalo pod sebe, když se to zmenší - bude se muset zrušit tabulka a nějak udělat flexbox
  return (
    <form onSubmit={addPoint} className='inputForm'>
      <table>
        <tr>
          <td>
            <label className='p-2'>X:</label>
            <input
              {...register('x', { required: true })}
              type='number'
              id='x'
              step='0.001'
              className='input input-bordered input-sm'
            />
          </td>
          <td>
            <label className='p-2'>Y:</label>
            <input
              {...register('y', { required: true })}
              type='number'
              id='y'
              step='0.001'
              className='input input-bordered input-sm'
            />
          </td>
          <td>
            <label className='p-2'>Z:</label>
            <input
              {...register('z', { required: true })}
              type='number'
              id='x'
              step='0.001'
              className='input input-bordered input-sm'
            />
          </td>
        </tr>

        <tr>
          <td>
            <label className='p-2'>Tag:</label>
            <input
              {...register('tag')}
              type='string'
              id='tag'
              className='input input-bordered input-sm'
            />
          </td>
          <td>
            <label className='p-2'>Layer:</label>
            <select
              className='select select-bordered select-sm'
              {...register('layerIndex')}
            >
              {getLayerSelection(layers)}
            </select>
          </td>
        </tr>
      </table>

      <button type='submit' className='buttonOutline'>
        Add point
      </button>
    </form>
  )
}

export default AddPoint
