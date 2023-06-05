import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Point } from '../../data-model/Point'
import { prevEnterSub } from '../../common/FormFunctions'
import Multiselect from 'multiselect-react-dropdown'
import { ErrorMessage } from '../../common/AlertMessageTypes'
import {
  AlertContext,
  ModelContext,
} from '../../context/GlobalContextComponent'
import PointForm from '../element-forms/PointForm'

interface AddPointProps {
  onAddPoint: (newPoint: Point) => void
}

const AddPoint = ({ onAddPoint }: AddPointProps) => {
  const { layers } = useContext(ModelContext)
  const throwMessage = useContext(AlertContext)

  const { register, handleSubmit, reset, setValue } = useForm({})

  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelect = useRef<Multiselect>(null)

  const addPoint = handleSubmit(data => {
    try {
      onAddPoint(
        new Point(
          Number(data.x),
          Number(data.y),
          Number(data.z),
          data.tag,
          multiSelect.current?.getSelectedItems()
        )
      )
      // Reset form and multiselect
      reset()
      multiSelect.current?.resetSelectedValues()
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
    <form
      onSubmit={addPoint}
      className='inputForm'
      onKeyDown={e => prevEnterSub(e)}
    >
      <div className='table-column inputBlock'>
        <PointForm
          layers={layers}
          multiSelectRef={multiSelect}
          disabled={false}
          register={register}
          setValue={setValue}
        />
      </div>

      <div className='pl-2 py-4 w-full'>
        <button type='submit' className='buttonPrimary'>
          Add point
        </button>
      </div>
    </form>
  )
}

export default AddPoint
