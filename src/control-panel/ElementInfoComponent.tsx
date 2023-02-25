import { Drawable, removeDuplicites } from '../data-model/Interfaces'
import { Layer } from '../data-model/Layer'
import { Point } from '../data-model/Point'
import { Vector } from '../data-model/Vector'
import { round } from 'exact-math'

interface ElementInfoProps {
  element: Drawable | null
}

const ElementInfo = ({ element }: ElementInfoProps) => {
  const displayElemLayers = () => {
    let layers = ''

    const layersUnique = removeDuplicites(element?.layers) as Layer[]

    layersUnique.map((layer, index) => {
      layers += `${layer.name}`
      if (index !== layersUnique.length - 1) {
        layers += ', '
      }
    })
    return layers
  }

  const getElementInfo = () => {
    if (!element) {
      return <div className='italic'>Click on any element on screen.</div>
    }
    return (
      <div className='border-spacing-x-2'>
        <div className='table-row'>
          <span className='table-cell'>Type:</span>
          <span className='table-cell italic'>
            {element instanceof Vector && 'Vector'}
            {element instanceof Point && 'Point'}
          </span>
        </div>
        <div className='table-row'>
          <span className='table-cell'>Description:</span>
          <span className='table-cell italic'>{element.toString()}</span>
        </div>
        <div className='table-row'>
          <span className='table-cell'>Layers:</span>
          <span className='table-cell italic'>{displayElemLayers()}</span>
        </div>
        {element instanceof Vector && (
          <div className='table-row'>
            <span className='table-cell'>Vector length:</span>
            <span className='table-cell italic'>
              {round(element.length(), -3)}
            </span>
          </div>
        )}
      </div>
    )
  }

  // Render
  return (
    <>
      <div className='font-semibold'>Selected element:</div>
      <div>{getElementInfo()}</div>
    </>
  )
}

export default ElementInfo
