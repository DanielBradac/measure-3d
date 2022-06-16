import { useForm } from 'react-hook-form'
import { Drawable, Point, Vector } from '../data-model/Drawable'

type FormData = {
  xFrom: number
  yFrom: number
  zFrom: number
  tagFrom: string

  xTo: number
  yTo: number
  zTo: number
  tagTo: string
}

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
  onAddPoint: (newVPoint: Point[]) => void
}

const AddVector = ({ onAddVector, onAddPoint }: AddVectorProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      xFrom: 0,
      yFrom: 0,
      zFrom: 0,
      tagFrom: '',

      xTo: 0,
      yTo: 0,
      zTo: 0,
      tagTo: '',
    },
  })
  // Render

  const addVector = handleSubmit(data => {
    const from = new Point(data.xFrom, data.yFrom, data.zFrom, data.tagFrom)
    const to = new Point(data.xTo, data.yTo, data.zTo, data.tagTo)

    onAddPoint([from, to])
    onAddVector([new Vector(from, to)])
  })

  return (
    <form onSubmit={addVector}>
      <div>
        <p>Point from:</p>
        <label htmlFor='xFrom'>X:</label>
        <input {...register('xFrom')} type='number' id='x' step='0.001' />

        <label htmlFor='yFrom'>Y:</label>
        <input {...register('yFrom')} type='number' id='y' step='0.001' />

        <label htmlFor='zFrom'>Z:</label>
        <input {...register('zFrom')} type='number' id='z' step='0.001' />

        <label htmlFor='tagFrom'>Tag:</label>
        <input {...register('tagFrom')} type='string' id='tag' />
      </div>

      <div>
        <p>Point to:</p>
        <label htmlFor='xTo'>X:</label>
        <input {...register('xTo')} type='number' id='x' step='0.001' />

        <label htmlFor='yTo'>Y:</label>
        <input {...register('yTo')} type='number' id='y' step='0.001' />

        <label htmlFor='zTo'>Z:</label>
        <input {...register('zTo')} type='number' id='z' step='0.001' />

        <label htmlFor='tagTo'>Tag:</label>
        <input {...register('tagTo')} type='string' id='tag' />
      </div>

      <button type='submit'>Add vector</button>
    </form>
  )
}

export default AddVector
