/* eslint-disable import/named */
import Multiselect from 'multiselect-react-dropdown'
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import MultiSelectComponent from '../../common-components/MultiSelectComponent'
import { Layer } from '../../data-model/Layer'
import { Point } from '../../data-model/Point'

interface PointFormProps {
  point?: Point | null
  layers: Layer[]
  multiSelectRef: React.RefObject<Multiselect>
  disabled: boolean
  formSuffix?: string
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

const PointForm = ({
  point,
  layers,
  multiSelectRef,
  disabled,
  register,
  formSuffix,
  setValue,
}: PointFormProps) => {
  if (point) {
    setValue(`x${formSuffix}`, point.x)
    setValue(`y${formSuffix}`, point.y)
    setValue(`z${formSuffix}`, point.z)
    setValue(`tag${formSuffix}`, point.tag)
  } else {
    setValue(`x${formSuffix}`, 0)
    setValue(`y${formSuffix}`, 0)
    setValue(`z${formSuffix}`, 0)
    setValue(`tag${formSuffix}`, '')
  }
  // Render
  return (
    <>
      <div className='table-row'>
        <label className='table-cell itemLabel'>X:</label>
        <input
          {...register(`x${formSuffix}`, {
            required: true,
            valueAsNumber: true,
          })}
          type='number'
          id={`x${formSuffix}`}
          step='0.001'
          className='table-cell input input-bordered input-sm'
          disabled={disabled}
          defaultValue={0}
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Y:</label>
        <input
          {...register(`y${formSuffix}`, {
            required: true,
            valueAsNumber: true,
          })}
          type='number'
          id={`y${formSuffix}`}
          step='0.001'
          className='table-cell input input-bordered input-sm'
          disabled={disabled}
          defaultValue={0}
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Z:</label>
        <input
          {...register(`z${formSuffix}`, {
            required: true,
            valueAsNumber: true,
          })}
          type='number'
          id={`z${formSuffix}`}
          step='0.001'
          className='table-cell input input-bordered input-sm'
          disabled={disabled}
          defaultValue={0}
        />
      </div>

      <div className='table-row'>
        <label className='table-cell itemLabel'>Tag:</label>

        <input
          {...register(`tag${formSuffix}`)}
          type='string'
          id={`tag${formSuffix}`}
          className='table-cell input input-bordered input-sm'
          disabled={disabled}
          defaultValue={point?.tag}
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
            disabled={disabled}
            preSelectedValues={point?.layers || []}
          />
        </div>
      </div>
    </>
  )
}

PointForm.defaultProps = {
  formSuffix: '',
}

export default PointForm
