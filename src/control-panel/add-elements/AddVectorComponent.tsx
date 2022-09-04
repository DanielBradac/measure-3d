import Multiselect from 'multiselect-react-dropdown'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ModelContext } from '../../App'
import MultiSelectComponent from '../../common/MultiSelectComponent'
import { getPointSelection } from '../../common/Selections'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
}

const AddVector = ({ onAddVector }: AddVectorProps) => {
  const { points, layers, vectors } = useContext(ModelContext)

  const { register, handleSubmit, setValue, resetField, reset } = useForm({
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

  // Multiselect is not supported by useForm - we have layers separately
  const [selectedLayersFrom, setSelectedLayersFrom] = useState<Layer[]>([])
  const [selectedLayersTo, setSelectedLayersTo] = useState<Layer[]>([])

  const [fromDisabled, setFromDisabled] = useState<boolean>(false)
  const [toDisabled, setToDisabled] = useState<boolean>(false)

  // Create new vector, add it to point's vector set and let parent know
  const createVector = (from: Point, to: Point) => {
    const newVector = new Vector(from, to)
    onAddVector([newVector])
  }

  // Set FROM point values form an existing point
  const setFromPoint = (blueprint: Point) => {
    setFromDisabled(true)
    setValue('xFrom', blueprint.x)
    setValue('yFrom', blueprint.y)
    setValue('zFrom', blueprint.z)
    setValue('tagFrom', blueprint.tag)
    setSelectedLayersFrom(blueprint.layers)
  }

  // Set TO point values form an existing point
  const setToPoint = (blueprint: Point) => {
    setToDisabled(true)
    setValue('xTo', blueprint.x)
    setValue('yTo', blueprint.y)
    setValue('zTo', blueprint.z)
    setValue('tagTo', blueprint.tag)
    setSelectedLayersTo(blueprint.layers)
  }

  // From point is 'to' point of last added vector by default
  useEffect(() => {
    if (vectors.length > 0) {
      const point = vectors[vectors.length - 1].to
      setFromPoint(point)
      setValue('pointFrom', points.indexOf(point).toString())
    }
  }, [vectors])

  const submitVector = handleSubmit(data => {
    // Do we have selected existing points or a new ones?
    const from =
      data.pointFrom === 'new'
        ? new Point(
            // There must be a conversion tu number, because otherwise it passes string and typescript is for some reason ok with it
            Number(data.xFrom),
            Number(data.yFrom),
            Number(data.zFrom),
            data.tagFrom,
            selectedLayersFrom
          )
        : points[parseInt(data.pointFrom)]

    const to =
      data.pointTo === 'new'
        ? new Point(
            Number(data.xTo),
            Number(data.yTo),
            Number(data.zTo),
            data.tagTo,
            selectedLayersTo
          )
        : points[parseInt(data.pointTo)]

    // Create new Vector
    createVector(from, to)

    // Reset the form
    reset()
    setSelectedLayersFrom([])
    setSelectedLayersTo([])
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
      setSelectedLayersFrom([])
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
      setSelectedLayersTo([])
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
            <label className='table-cell itemLabel align-top'>Layers:</label>
            <div className='table-cell mt-10'>
              <MultiSelectComponent
                onRemove={(selectedList: Layer[]) =>
                  setSelectedLayersFrom(selectedList)
                }
                onSelect={(selectedList: Layer[]) =>
                  setSelectedLayersFrom(selectedList)
                }
                placeholder='Select layers...'
                selectedValues={selectedLayersFrom}
                // this is here bacause of a bug on resetting selectedLayers
                options={layers}
                displayValue='name'
                emptyRecordMsg='No layers available'
              />
            </div>
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
            <label className='table-cell itemLabel align-top'>Layers:</label>
            <div className='table-cell mt-10'>
              <MultiSelectComponent
                onRemove={(selectedList: Layer[]) =>
                  setSelectedLayersTo(selectedList)
                }
                onSelect={(selectedList: Layer[]) =>
                  setSelectedLayersTo(selectedList)
                }
                placeholder='Select layers...'
                selectedValues={selectedLayersTo}
                // this is here bacause of a bug on resetting selectedLayers
                options={layers}
                displayValue='name'
                emptyRecordMsg='No layers available'
              />
            </div>
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
