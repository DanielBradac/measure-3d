import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getLayerSelection, getPointSelection } from '../../common/Selections'
import { indexOf } from '../../data-model/Interfaces'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
  onAddPoint: (newVPoint: Point[]) => void
  points: Point[]
  vectors: Vector[]
  layers: Layer[]
}

const AddVector = ({
  onAddVector,
  onAddPoint,
  points,
  vectors,
  layers,
}: AddVectorProps) => {
  const { register, handleSubmit, setValue, resetField, reset } = useForm({
    defaultValues: {
      xFrom: 0,
      yFrom: 0,
      zFrom: 0,
      tagFrom: '',
      layerIndexFrom: 0,

      xTo: 0,
      yTo: 0,
      zTo: 0,
      tagTo: '',
      layerIndexTo: 0,

      pointFrom: 'new',
      pointTo: 'new',
    },
  })

  const [fromDisabled, setFromDisabled] = useState<boolean>(false)
  const [toDisabled, setToDisabled] = useState<boolean>(false)

  // Create new vector, add it to point's vector set and let parent know
  const createVector = (from: Point, to: Point) => {
    const newVector = new Vector(from, to)
    from.addVector(newVector)
    to.addVector(newVector)
    onAddVector([newVector])
  }

  // Set FROM point values form an existing point
  const setFromPoint = (blueprint: Point) => {
    setFromDisabled(true)
    setValue('xFrom', blueprint.x)
    setValue('yFrom', blueprint.y)
    setValue('zFrom', blueprint.z)
    setValue('tagFrom', blueprint.tag)
    const layerIndex = indexOf(layers, blueprint.layer)
    setValue('layerIndexFrom', layerIndex === -1 ? 0 : layerIndex)
  }

  // Set TO point values form an existing point
  const setToPoint = (blueprint: Point) => {
    setToDisabled(true)
    setValue('xTo', blueprint.x)
    setValue('yTo', blueprint.y)
    setValue('zTo', blueprint.z)
    setValue('tagTo', blueprint.tag)
    const layerIndex = indexOf(layers, blueprint.layer)
    setValue('layerIndexTo', layerIndex === -1 ? 0 : layerIndex)
  }

  // From point is 'to' point of last added vector by default
  useEffect(() => {
    if (vectors.length > 0) {
      const point = vectors[vectors.length - 1].to
      setFromPoint(point)
      setValue('pointFrom', points.indexOf(point).toString())
    }
  }, [points, vectors])

  const submitVector = handleSubmit(data => {
    // Do we have selected existing points or a new ones?
    const from =
      data.pointFrom === 'new'
        ? new Point(
            data.xFrom,
            data.yFrom,
            data.zFrom,
            data.tagFrom,
            layers[data.layerIndexFrom]
          )
        : points[parseInt(data.pointFrom)]

    const to =
      data.pointTo === 'new'
        ? new Point(
            data.xTo,
            data.yTo,
            data.zTo,
            data.tagTo,
            layers[data.layerIndexTo]
          )
        : points[parseInt(data.pointTo)]

    const newPoints: Point[] = []
    if (data.pointFrom === 'new') {
      newPoints.push(from)
    }
    if (data.pointTo === 'new') {
      newPoints.push(to)
    }
    // Create new points and new vector, if there aren't any, rerender will not be called
    onAddPoint(newPoints)
    createVector(from, to)

    // Reset the form
    reset()
    setToDisabled(false)
    setFromDisabled(false)
  })

  // From point selection changed
  const handleChangeFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      setFromPoint(points[parseInt(event.currentTarget.value)])
    } else {
      setFromDisabled(false)
      resetField('xFrom')
      resetField('yFrom')
      resetField('zFrom')
      resetField('tagFrom')
      resetField('layerIndexFrom')
    }
  }

  // To point selection changed
  const handleChangeTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      setToPoint(points[parseInt(event.currentTarget.value)])
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
      <form onSubmit={submitVector} className='inputForm'>
        <div className='table-column inputBlock mr-8'>
          <span className='table-row formHeader'>Point from</span>
          <select
            className='table-row select select-bordered select-sm noLabelSelect'
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
          <div className='table-row'>
            <label className='table-cell itemLabel'>Layer:</label>
            <select
              className='table-cell select select-bordered select-sm'
              {...register('layerIndexFrom')}
              disabled={fromDisabled}
            >
              {getLayerSelection(layers)}
            </select>
          </div>
        </div>

        <div className='table-column inputBlock'>
          <h3 className='table-row formHeader'>Point to</h3>
          <select
            className='table-row select select-bordered select-sm noLabelSelect'
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
          <div className='table-row'>
            <label className='table-cell itemLabel'>Layer:</label>
            <select
              className='table-cell select select-bordered select-sm'
              {...register('layerIndexTo')}
              disabled={toDisabled}
            >
              {getLayerSelection(layers)}
            </select>
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
