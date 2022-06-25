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
    <form onSubmit={addPoint}>
      <h3>New point</h3>
      <label htmlFor='X'>X:</label>

      <input
        {...register('x', { required: true })}
        type='number'
        id='x'
        step='0.001'
      />
      {errors.x && errors.x.type === 'required' && (
        <span>This is required</span>
      )}

      <label htmlFor='Y'>Y:</label>
      <input
        {...register('y', { required: true })}
        type='number'
        id='y'
        step='0.001'
      />
      {errors.y && errors.y.type === 'required' && (
        <span>This is required</span>
      )}

      <label htmlFor='Z'>Z:</label>
      <input
        {...register('z', { required: true })}
        type='number'
        id='z'
        step='0.001'
      />
      {errors.z && errors.z.type === 'required' && (
        <span>This is required</span>
      )}
      <br />
      <label htmlFor='tag'>Tag:</label>
      <input {...register('tag')} type='string' id='tag' />

      <select {...register('layerIndex')}>{getLayerSelection(layers)}</select>

      <button type='submit' className='buttonPrimary'>
        Add point
      </button>
    </form>
  )
}

export default AddPoint