import { useContext, useRef } from 'react'
import { Point } from '../../data-model/Point'
import PointForm from '../element-forms/PointForm'
import { ModelContext } from '../../context/GlobalContextComponent'
import { useForm } from 'react-hook-form'
import Multiselect from 'multiselect-react-dropdown'
import { prevEnterSub } from '../../common/FormFunctions'

interface PointEditorProps {
  point: Point
}

const PointEditor = ({ point }: PointEditorProps) => {
  const { layers } = useContext(ModelContext)
  const { register, handleSubmit, reset, setValue } = useForm({})
  // Multiselect ref - needed for getting data and reseting multiselect
  const multiSelect = useRef<Multiselect>(null)

  // Render
  return (
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

      <div className='pl-3 py-2 w-full'>
        <button type='submit' className='buttonPrimary'>
          Apply changes
        </button>
      </div>

      <div className='pl-3 w-full'>
        <button className='buttonError'>Delete point</button>
      </div>
    </form>
  )
}

export default PointEditor
