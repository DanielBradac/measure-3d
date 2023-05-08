import { ReactNode, useContext } from 'react'
import { InteractionContext } from '../../context/GlobalContextComponent'
import ElementInfo from '../ElementInfoComponent'
import { Point } from '../../data-model/Point'
import PointEditor from './PointEditor'
import { Vector } from '../../data-model/Vector'
import VectorEditor from './VectorEditor'

const Editor = () => {
  // Interaction context
  const interactions = useContext(InteractionContext)

  const getEditor = (): ReactNode => {
    const clickedElement = interactions.interModel.clicked
    if (!clickedElement) {
      return <></>
    }

    switch (clickedElement.constructor) {
      case Point:
        return <PointEditor point={clickedElement as Point} />
      case Vector:
        return <VectorEditor vector={clickedElement as Vector} />
    }
  }

  // Render
  return (
    <div>
      <ElementInfo element={interactions.interModel.clicked} />
      <div>{getEditor()}</div>
    </div>
  )
}

export default Editor
