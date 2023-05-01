import Multiselect from 'multiselect-react-dropdown'
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '../../common/AlertMessageTypes'
import { prevEnterSub } from '../../common/FormFunctions'
import { getPointSelection } from '../../common/Selections'
import {
  AlertContext,
  ModelContext,
} from '../../context/GlobalContextComponent'
import { Point } from '../../data-model/Point'
import { Vector } from '../../data-model/Vector'
import PointForm from '../element-forms/PointForm'
import { indexOf } from '../../data-model/Interfaces'

interface AddVectorProps {
  onAddVector: (newVector: Vector[]) => void
}

const AddVector = ({ onAddVector }: AddVectorProps) => {
  const { points, layers, vectors } = useContext(ModelContext)
  const throwMessage = useContext(AlertContext)

  const { register, handleSubmit, setValue, reset } = useForm({})

  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelectFrom = useRef<Multiselect>(null)
  const multiSelectTo = useRef<Multiselect>(null)

  // Existing points in selections
  const [fromSelect, setFromSelect] = useState<string>('new')
  const [toSelect, setToSelect] = useState<string>('new')

  // Create new vector, add it to point's vector set and let parent know
  const createVector = (from: Point, to: Point) => {
    const newVector = new Vector(from, to)
    onAddVector([newVector])
  }

  // From point is 'to' point of last added vector by default
  useEffect(() => {
    if (vectors.length > 0) {
      const toPoint = vectors[vectors.length - 1].to
      setFromSelect(indexOf(points, toPoint).toString())
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
      setFromSelect('new')
      setToSelect('new')
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
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFromSelect(e.currentTarget.value)
            }
            value={fromSelect}
          >
            {getPointSelection(points)}
          </select>
          <PointForm
            layers={layers}
            multiSelectRef={multiSelectFrom}
            disabled={fromSelect !== 'new'}
            register={register}
            formSuffix='From'
            point={fromSelect === 'new' ? null : points[parseInt(fromSelect)]}
            setValue={setValue}
          />
        </div>

        <div className='table-column inputBlock'>
          <h3 className='table-row formHeader'>Point to</h3>
          <select
            className='table-row select select-bordered select-sm noLabelSelect'
            {...register('pointTo')}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setToSelect(e.currentTarget.value)
            }
          >
            {getPointSelection(points)}
          </select>

          <PointForm
            layers={layers}
            multiSelectRef={multiSelectTo}
            disabled={toSelect !== 'new'}
            register={register}
            formSuffix='To'
            point={toSelect === 'new' ? null : points[parseInt(toSelect)]}
            setValue={setValue}
          />
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
