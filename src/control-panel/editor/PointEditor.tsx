import { useContext, useRef } from 'react'
import { Point } from '../../data-model/Point'
import PointForm from '../element-forms/PointForm'
import {
  AlertContext,
  ModelContext,
} from '../../context/GlobalContextComponent'
import { useForm } from 'react-hook-form'
import Multiselect from 'multiselect-react-dropdown'
import { prevEnterSub } from '../../common/FormFunctions'
import { ErrorMessage } from '../../common/AlertMessageTypes'

interface PointEditorProps {
  point: Point
}

const PointEditor = ({ point }: PointEditorProps) => {
  const { removePoint, editPoint, model } = useContext(ModelContext)
  const { layers } = model
  const throwMessage = useContext(AlertContext)

  const { register, handleSubmit, reset, setValue } = useForm({})
  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelect = useRef<Multiselect>(null)

  const onRemovePoint = handleSubmit(() => {
    removePoint(point)
    // Reset form and multiselect
    reset()
    multiSelect.current?.resetSelectedValues()
  })

  const onEditPoint = handleSubmit(data => {
    try {
      editPoint(
        point,
        new Point(
          data.x,
          data.y,
          data.z,
          data.tag,
          multiSelect.current?.getSelectedItems()
        )
      )
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
      <form className='inputForm' onKeyDown={e => prevEnterSub(e)}>
        <div className='table-column inputBlock'>
          <PointForm
            layers={layers}
            multiSelectRef={multiSelect}
            disabled={false}
            register={register}
            setValue={setValue}
            point={point}
          />
        </div>

        <div className='pl-2 py-2 w-full'>
          <button type='submit' className='buttonPrimary' onClick={onEditPoint}>
            Save changes
          </button>
        </div>
      </form>

      <div className='pl-2 w-full'>
        <button className='buttonError' onClick={onRemovePoint}>
          Delete point
        </button>
      </div>
    </>
  )
}

export default PointEditor
