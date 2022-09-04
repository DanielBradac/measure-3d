import Multiselect from 'multiselect-react-dropdown'
import { Layer } from '../data-model/Layer'

// TODO try to make this general
interface MultiSelectComponentProps {
  onRemove: (selectedList: Layer[]) => void
  onSelect: (selectedList: Layer[]) => void
  placeholder: string
  selectedValues: Layer[]
  options: Layer[]
  displayValue: string
  emptyRecordMsg: string
}

const MultiSelectComponent = ({
  onRemove,
  onSelect,
  placeholder,
  selectedValues,
  options,
  displayValue,
}: MultiSelectComponentProps) => {
  // Render
  return (
    <Multiselect
      onRemove={onRemove}
      onSelect={onSelect}
      hidePlaceholder={true}
      placeholder={placeholder}
      selectedValues={selectedValues}
      // this is here bacause of a bug on resetting selectedValues
      options={[...options, ...selectedValues]}
      avoidHighlightFirstOption={true}
      displayValue={displayValue}
      emptyRecordMsg='No layers available'
      className='multiSelectContainer'
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
