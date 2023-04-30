import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Point } from '../../data-model/Point'
import { prevEnterSub } from '../../common/FormFunctions'
import Multiselect from 'multiselect-react-dropdown'
import { ErrorMessage } from '../../common/AlertMessageTypes'
import { addPointDefault } from './FormDefaultValues'
import {
  AlertContext,
  ModelContext,
} from '../../context/GlobalContextComponent'
import PointForm from '../element-forms/PointForm'

interface AddPointProps {
  onAddPoint: (newPoint: Point[]) => void
}

const AddPoint = ({ onAddPoint }: AddPointProps) => {
  const { layers } = useContext(ModelContext)
  const throwMessage = useContext(AlertContext)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: addPointDefault,
  })

  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelect = useRef<Multiselect>(null)

  const addPoint = handleSubmit(data => {
    try {
      onAddPoint([
        new Point(
          Number(data.x),
          Number(data.y),
          Number(data.z),
          data.tag,
          multiSelect.current?.getSelectedItems()
        ),
      ])
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
      <PointForm
        layers={layers}
        multiSelectRef={multiSelect}
        register={register}
      />

      <div className='submitButton'>
        <button type='submit' className='buttonOutline'>
          Add point
        </button>
      </div>
    </form>
  )
}

export default AddPoint
