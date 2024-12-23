import { Point } from '../data-model/Point'
import { SelectOption } from './Types'

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
