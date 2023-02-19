import { Model } from '../context/Model'
import { Layer } from '../data-model/Layer'

export const getDeafaultModel = () => {
  return new Model(
    [],
    [],
    [
      new Layer('BaseLayer', 'white'),
      new Layer('RedLayer', 'red'),
      new Layer('GreenLayer', 'green'),
      new Layer('BlackLayer', 'black'),
      new Layer('OrangeLayer', 'orange'),
    ]
  )
}
