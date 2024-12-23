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
      className='rounded-lg bg-white pt-1 pb-1'
      disable={disabled}
      closeIcon='cancel'
      style={{
        chips: {
          background: '#2563EB',
          display: 'list-item',
          marginRight: '0px',
        },
        searchBox: {
          border: 'none',
          padding: '0 0.75rem',
          listStyleType: 'none',
        },
        multiselectContainer: {},
      }}
    />
  )
}

export default MultiSelectComponent
