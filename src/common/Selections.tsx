import { Point } from '../data-model/Drawable'
import { Layer } from '../data-model/Layer'
import { SelectOption } from './Types'
import { BsFillGearFill } from 'react-icons/bs'

// Values for points selection = 'new' and indices of prop 'points', f.e.: ['new', 0, 1, 2, 3]
export function getPointSelection(points: Point[]): JSX.Element[] {
  const options: SelectOption[] = [{ value: 'new', label: 'New point' }]
  points.forEach((p, index) => {
    options.push({ value: index, label: p.toString() })
  })

  return options.map(({ label, value }, index) => (
    <option key={index} value={value}>
      {label}
    </option>
  ))
}

// Values for selection are indeces in given layers array
export function getLayerSelection(layers: Layer[]): JSX.Element[] {
  return layers.map((layer, index) => {
    return (
      <>
        <option key={index} value={index}>
          {layer.name}
          <BsFillGearFill className='text-blue-500 m-2 clickable' size={5} />
        </option>
      </>
    )
  })
}
