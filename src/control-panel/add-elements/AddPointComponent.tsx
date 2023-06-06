import { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { Point } from '../../data-model/Point'
import { prevEnterSub } from '../../common/FormFunctions'
import Multiselect from 'multiselect-react-dropdown'
import { ModelContext } from '../../context/GlobalContextComponent'
import PointForm from '../element-forms/PointForm'

const AddPoint = () => {
  const { addPoint, model } = useContext(ModelContext)
  const { layers } = model

  const { register, handleSubmit, reset, setValue } = useForm({})

  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelect = useRef<Multiselect>(null)

  const onAddPoint = handleSubmit(data => {
    addPoint(
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
  })

  // Render
  return (
    <form
      onSubmit={onAddPoint}
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
