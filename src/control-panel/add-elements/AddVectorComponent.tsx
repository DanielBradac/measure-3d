import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SelectOption } from '../../common/Types'
import { Point, Vector } from '../../data-model/Drawable'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
  onAddPoint: (newVPoint: Point[]) => void
  points: Point[]
}

const AddVector = ({ onAddVector, onAddPoint, points }: AddVectorProps) => {
  const { register, handleSubmit, setValue } = useForm({
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

  const [selectedFrom, setSelectedFrom] = useState<Point | null>(null)
  const [selectedTo, setSelectedTo] = useState<Point | null>(null)

  // Values for points selection = 'new' and indices of prop 'points', f.e.: ['new', 0, 1, 2, 3]
  const getOptions = (): JSX.Element[] => {
    const options: SelectOption[] = [{ value: 'new', label: 'New point' }]
    points.forEach((p, index) => {
      options.push({ value: index, label: p.toString() })
    })

    return options.map(({ label, value }, index) => (
      <option key={index} value={value}>
        {label}
      </option>
    ))
  }

  const addVector = handleSubmit(data => {
    const from =
      selectedFrom ||
      new Point(data.xFrom, data.yFrom, data.zFrom, data.tagFrom)
    const to = selectedTo || new Point(data.xTo, data.yTo, data.zTo, data.tagTo)
    const newPoints: Point[] = []

    if (!selectedFrom) {
      newPoints.push(from)
    }
    if (!selectedTo) {
      newPoints.push(to)
    }

    onAddPoint(newPoints)
    onAddVector([new Vector(from, to)])
  })

  // If point select changes, we disable point input, and set it to chosen point
  const handlePointChange = (
    input: string,
    setter: (_: Point | null) => void
  ): Point | void => {
    if (input === 'new') {
      return setter(null)
    }
    const selectedPoint = points[parseInt(input)]
    setter(selectedPoint)
    return selectedPoint
  }

  // From point changed
  const handleChangeFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const point = handlePointChange(event.currentTarget.value, setSelectedFrom)
    if (point) {
      setValue('xFrom', point.x)
      setValue('yFrom', point.y)
      setValue('zFrom', point.z)
      setValue('tagFrom', point.tag)
    }
  }

  // To point changed
  const handleChangeTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const point = handlePointChange(event.currentTarget.value, setSelectedTo)
    if (point) {
      setValue('xTo', point.x)
      setValue('yTo', point.y)
      setValue('zTo', point.z)
      setValue('tagTo', point.tag)
    }
  }

  // Render
  return (
    <>
      <form onSubmit={addVector}>
        <div>
          <h3>Point from</h3>
          <select onChange={handleChangeFrom}>{getOptions()}</select>
          <br />

          <label htmlFor='xFrom'>X:</label>
          <input
            {...register('xFrom')}
            type='number'
            id='xFrom'
            step='0.001'
            disabled={selectedFrom !== null}
          />

          <label htmlFor='yFrom'>Y:</label>
          <input
            {...register('yFrom')}
            type='number'
            id='yFrom'
            step='0.001'
            disabled={selectedFrom !== null}
          />

          <label htmlFor='zFrom'>Z:</label>
          <input
            {...register('zFrom')}
            type='number'
            id='zFrom'
            step='0.001'
            disabled={selectedFrom !== null}
          />

          <label htmlFor='tagFrom'>Tag:</label>
          <input
            {...register('tagFrom')}
            type='string'
            id='tagFrom'
            disabled={selectedFrom !== null}
          />
        </div>

        <div>
          <h3>Point to</h3>
          <select onChange={handleChangeTo}>{getOptions()}</select>
          <br />

          <label htmlFor='xTo'>X:</label>
          <input
            {...register('xTo')}
            type='number'
            id='x'
            step='0.001'
            disabled={selectedTo !== null}
          />

          <label htmlFor='yTo'>Y:</label>
          <input
            {...register('yTo')}
            type='number'
            id='y'
            step='0.001'
            disabled={selectedTo !== null}
          />

          <label htmlFor='zTo'>Z:</label>
          <input
            {...register('zTo')}
            type='number'
            id='z'
            step='0.001'
            disabled={selectedTo !== null}
          />

          <label htmlFor='tagTo'>Tag:</label>
          <input
            {...register('tagTo')}
            type='string'
            id='tag'
            disabled={selectedTo !== null}
          />
        </div>

        <button type='submit' className='buttonPrimary'>
          Add vector
        </button>
      </form>
    </>
  )
}

export default AddVector
