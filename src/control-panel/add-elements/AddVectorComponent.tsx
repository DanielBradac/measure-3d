import Multiselect from 'multiselect-react-dropdown'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertContext, ModelContext } from '../../App'
import MultiSelectComponent from '../../common-components/MultiSelectComponent'
import { ErrorMessage } from '../../common/AlertMessageTypes'
import { prevEnterSub } from '../../common/FormFunctions'
import { getPointSelection } from '../../common/Selections'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
}

const AddVector = ({ onAddVector }: AddVectorProps) => {
  const { points, layers, vectors } = useContext(ModelContext)
  const throwMessage = useContext(AlertContext)

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

  // Preselected layers of possible point preselection
  const [preSelectLayersFrom, setPreSelectLayersFrom] = useState<Layer[]>([])
  const [preSelectLayersTo, setPreSelectLayersTo] = useState<Layer[]>([])
  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelectFrom = useRef<Multiselect>(null)
  const multiSelectTo = useRef<Multiselect>(null)

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
    setPreSelectLayersFrom(blueprint.layers)
  }

  // Set TO point values form an existing point
  const setToPoint = (blueprint: Point) => {
    setToDisabled(true)
    setValue('xTo', blueprint.x)
    setValue('yTo', blueprint.y)
    setValue('zTo', blueprint.z)
    setValue('tagTo', blueprint.tag)
    setPreSelectLayersTo(blueprint.layers)
  }

  // From point is 'to' point of last added vector by default
  useEffect(() => {
    if (vectors.length > 0) {
      const point = vectors[vectors.length - 1].to
      setFromPoint(point)
      setValue('pointFrom', points.indexOf(point).toString())
    }
  }, [vectors])

  // Vector submitted
  const submitVector = handleSubmit(data => {
    try {
      const from =
        // Do we have selected existing points or a new ones?
        data.pointFrom === 'new'
          ? new Point(
              // There must be a conversion tu number, because otherwise it passes string and typescript is for some reason ok with it
              Number(data.xFrom),
              Number(data.yFrom),
              Number(data.zFrom),
              data.tagFrom,
              multiSelectFrom.current?.getSelectedItems()
            )
          : points[parseInt(data.pointFrom)]

      const to =
        data.pointTo === 'new'
          ? new Point(
              Number(data.xTo),
              Number(data.yTo),
              Number(data.zTo),
              data.tagTo,
              multiSelectTo.current?.getSelectedItems()
            )
          : points[parseInt(data.pointTo)]

      // Create new Vector
      createVector(from, to)

      // Reset the form
      reset()
      setPreSelectLayersFrom([])
      setPreSelectLayersTo([])
      setToDisabled(false)
      setFromDisabled(false)
      multiSelectFrom.current?.resetSelectedValues()
      multiSelectTo.current?.resetSelectedValues()
    } catch (e: unknown) {
      throwMessage(
        new ErrorMessage(
          e instanceof Error ? e.message : 'Unkown error occured'
        )
      )
    }
  })

  // From point selection changed
  const handleChangeFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      setFromPoint(points[parseInt(event.currentTarget.value)])
    } else {
      setFromDisabled(false)
      resetField('xFrom')
      resetField('yFrom')
      resetField('zFrom')
      resetField('tagFrom')
      setPreSelectLayersFrom([])
      multiSelectFrom.current?.resetSelectedValues()
    }
  }

  // To point selection changed
  const handleChangeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value !== 'new') {
      setToPoint(points[parseInt(event.currentTarget.value)])
    } else {
      setToDisabled(false)
      resetField('xTo')
      resetField('yTo')
      resetField('zTo')
      resetField('tagTo')
      setPreSelectLayersTo([])
      multiSelectTo.current?.resetSelectedValues()
    }
  }

  // Render
  return (
    <>
      <form
        onSubmit={submitVector}
        className='inputForm'
        onKeyDown={e => prevEnterSub(e)}
      >
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
            <label className='table-cell itemLabel'>Layers:</label>
            <div className='table-cell mt-10'>
              <MultiSelectComponent
                preSelectedValues={preSelectLayersFrom}
                disabled={fromDisabled}
                placeholder='Select layers...'
                options={layers}
                displayValue={Layer.selectDisplayValue}
                emptyRecordMsg='No layers available'
                multiSelect={multiSelectFrom}
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
            <label className='table-cell itemLabel'>Layers:</label>
            <div className='table-cell mt-10'>
              <MultiSelectComponent
                disabled={toDisabled}
                preSelectedValues={preSelectLayersTo}
                placeholder='Select layers...'
                options={layers}
                displayValue={Layer.selectDisplayValue}
                emptyRecordMsg='No layers available'
                multiSelect={multiSelectTo}
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
