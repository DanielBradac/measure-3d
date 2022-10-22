import Multiselect from 'multiselect-react-dropdown'
import { LegacyRef } from 'react'

interface MultiSelectComponentProps<T> {
  placeholder: string
  preSelectedValues?: T[]
  options: T[]
  displayValue: string
  emptyRecordMsg: string
  multiSelect: LegacyRef<Multiselect>
  disabled?: boolean
}

const MultiSelectComponent = ({
  placeholder,
  options,
  multiSelect,
  preSelectedValues,
  disabled,
  displayValue,
}: MultiSelectComponentProps<unknown>) => {
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
