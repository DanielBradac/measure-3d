import Multiselect from 'multiselect-react-dropdown'
// eslint-disable-next-line import/named
import { UseFormRegister } from 'react-hook-form'
import MultiSelectComponent from '../../common-components/MultiSelectComponent'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'

interface PointFormProps {
  point?: Point
  layers: Layer[]
  multiSelectRef: React.RefObject<Multiselect>
  register: UseFormRegister<{
    x: number
    y: number
    z: number
    tag: string
    layerIndex: number
  }>
}

const PointForm = ({
  point,
  layers,
  multiSelectRef,
  register,
}: PointFormProps) => {
  // Render
  return (
    <div className='table-column inputBlock'>
      <div className='table-row'>
        <label className='table-cell itemLabel'>X:</label>
        <input
          {...register('x', { required: true })}
          type='number'
          id='x'
          step='0.001'
          className='table-cell input input-bordered input-sm'
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Y:</label>
        <input
          {...register('y', { required: true })}
          type='number'
          id='y'
          step='0.001'
          className='table-cell input input-bordered input-sm'
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Z:</label>
        <input
          {...register('z', { required: true })}
          type='number'
          id='x'
          step='0.001'
          className='table-cell input input-bordered input-sm'
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Tag:</label>

        <input
          {...register('tag')}
          type='string'
          id='tag'
          className='table-cell input input-bordered input-sm'
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Layers:</label>
        <div className='table-cell mt-10'>
          <MultiSelectComponent
            placeholder='Select layers...'
            options={layers}
            displayValue={Layer.selectDisplayValue}
            emptyRecordMsg='No layers available'
            multiSelect={multiSelectRef}
          />
        </div>
      </div>
    </div>
  )
}

export default PointForm
