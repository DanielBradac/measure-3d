import Multiselect from 'multiselect-react-dropdown'
import { LegacyRef } from 'react'
import { Layer } from '../data-model/Layer'

// TODO try to make this general - remove Layer type
interface MultiSelectComponentProps {
  placeholder: string
  preSelectedValues?: Layer[]
  options: Layer[]
  displayValue: string
  emptyRecordMsg: string
  multiSelect: LegacyRef<Multiselect>
  disabled?: boolean
}

const MultiSelectComponent = ({
  placeholder,
  options,
  displayValue,
  multiSelect,
  preSelectedValues,
  disabled,
}: MultiSelectComponentProps) => {
  // Render
  return (
    <Multiselect
      selectedValues={preSelectedValues}
      hidePlaceholder={true}
      placeholder={placeholder}
      options={options}
      avoidHighlightFirstOption={true}
      displayValue={displayValue}
      emptyRecordMsg=''
      ref={multiSelect}
      className='multiSelectContainer'
      disable={disabled}
      style={{
        chips: {
          background: '#2563EB',
        },
        searchBox: {
          border: 'none',
          padding: '0 1rem',
        },
      }}
    />
  )
}

export default MultiSelectComponent
