import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getPointSelection } from '../../common/Selections'
import { Point, Vector } from '../../data-model/Drawable'
import { Layer } from '../../data-model/Layer'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
  onAddPoint: (newVPoint: Point[]) => void
  points: Point[]
  layers: Layer[]
}

// TODO layer select for new points
const AddVector = ({
  onAddVector,
  onAddPoint,
  points,
  layers,
}: AddVectorProps) => {
  const { register, handleSubmit, setValue, resetField } = useForm({
    defaultValues: {
      xFrom: 0,
      yFrom: 0,
      zFrom: 0,
      tagFrom: '',

      xTo: 0,
      yTo: 0,
      zTo: 0,
      tagTo: '',

      pointFrom: 'new',
      pointTo: 'new',
    },
  })

  const [fromDisabled, setFromDisabled] = useState<boolean>(false)
  const [toDisabled, setToDisabled] = useState<boolean>(false)

  const addVector = handleSubmit(data => {
    // Do we have selected points or a new ones?
    const from =
      data.pointFrom === 'new'
        ? new Point(data.xFrom, data.yFrom, data.zFrom, data.tagFrom, layers[0])
        : points[parseInt(data.pointFrom)]

    const to =
      data.pointTo === 'new'
        ? new Point(data.xTo, data.yTo, data.zTo, data.tagTo, layers[0])
        : points[parseInt(data.pointTo)]

    const newPoints: Point[] = []
    if (data.pointFrom === 'new') {
      newPoints.push(from)
    }
    if (data.pointTo === 'new') {
      newPoints.push(to)
    }

    onAddPoint(newPoints)
    // Layer is taken from the 'from' point
    onAddVector([new Vector(from, to, from.layer)])
  })

  // From point selection changed
  const handleChangeFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      const point = points[parseInt(event.currentTarget.value)]
      setFromDisabled(true)
      setValue('xFrom', point.x)
      setValue('yFrom', point.y)
      setValue('zFrom', point.z)
      setValue('tagFrom', point.tag)
    } else {
      setFromDisabled(false)
      resetField('xFrom')
      resetField('yFrom')
      resetField('zFrom')
      resetField('tagFrom')
    }
  }

  // To point selection changed
  const handleChangeTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      const point = points[parseInt(event.currentTarget.value)]
      setToDisabled(true)
      setValue('xTo', point.x)
      setValue('yTo', point.y)
      setValue('zTo', point.z)
      setValue('tagTo', point.tag)
    } else {
      setToDisabled(false)
      resetField('xTo')
      resetField('yTo')
      resetField('zTo')
      resetField('tagTo')
    }
  }

  // Render
  return (
    <>
      <form onSubmit={addVector} className='inputForm'>
        <div className='table-column inputBlock mr-8'>
          <span className='table-row'>Point from</span>
          <select
            className='table-row select select-bordered select-sm'
            {...register('pointFrom')}
            onChange={handleChangeFrom}
          >
            {getPointSelection(points)}
          </select>

          <div className='table-row'>
            <label className='table-cell itemLabel'>X:</label>
            <input
              {...register('xFrom')}
              type='number'
              id='xFrom'
              step='0.001'
              disabled={fromDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Y:</label>
            <input
              {...register('yFrom')}
              type='number'
              id='yFrom'
              step='0.001'
              disabled={fromDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Z:</label>
            <input
              {...register('zFrom')}
              type='number'
              id='zFrom'
              step='0.001'
              disabled={fromDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Tag:</label>
            <input
              {...register('tagFrom')}
              type='string'
              id='tagFrom'
              disabled={fromDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
        </div>

        <div className='table-column inputBlock'>
          <h3 className='table-row'>Point to</h3>
          <select
            className='table-row select select-bordered select-sm'
            {...register('pointTo')}
            onChange={handleChangeTo}
          >
            {getPointSelection(points)}
          </select>

          <div className='table-row'>
            <label className='table-cell itemLabel'>X:</label>
            <input
              {...register('xTo')}
              type='number'
              id='x'
              step='0.001'
              disabled={toDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Y:</label>
            <input
              {...register('yTo')}
              type='number'
              id='y'
              step='0.001'
              disabled={toDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Z:</label>
            <input
              {...register('zTo')}
              type='number'
              id='z'
              step='0.001'
              disabled={toDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
          <div className='table-row'>
            <label className='table-cell itemLabel'>Tag:</label>
            <input
              {...register('tagTo')}
              type='string'
              id='tag'
              disabled={toDisabled}
              className='table-cell input input-bordered input-sm'
            />
          </div>
        </div>

        <div className='submitButton'>
          <button type='submit' className='buttonOutline'>
            Add vector
          </button>
        </div>
      </form>
    </>
  )
}

export default AddVector
