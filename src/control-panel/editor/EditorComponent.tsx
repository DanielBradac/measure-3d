import { ReactNode, useContext } from 'react'
import { InteractionContext } from '../../context/GlobalContextComponent'
import ElementInfo from '../ElementInfoComponent'
import { Point } from '../../data-model/Point'
import PointEditor from './PointEditor'
import { Vector } from '../../data-model/Vector'
import VectorEditor from './VectorEditor'
import ModelVersionNavigation from '../../common-components/ModelVersionNavigationComponent'

interface EditorProps {
  onDeletePoint: (deletedPoint: Point[]) => void
  onDeleteVector: (deletedVector: Vector[]) => void
  onEditPoint: (existingPoint: Point, newPoint: Point) => void
  onSwapDirection: (vector: Vector) => void
}

const Editor = ({
  onDeletePoint,
  onEditPoint,
  onDeleteVector,
  onSwapDirection,
}: EditorProps) => {
  // Interaction context
  const interactions = useContext(InteractionContext)

  const getEditor = (): ReactNode => {
    const clickedElement = interactions.interModel.clicked
    if (!clickedElement) {
      return <></>
    }

    switch (clickedElement.constructor) {
      case Point:
        return (
          <PointEditor
            point={clickedElement as Point}
            onDeletePoint={onDeletePoint}
            onEditPoint={onEditPoint}
          />
        )
      case Vector:
        return (
          <VectorEditor
            vector={clickedElement as Vector}
            onDeleteVector={onDeleteVector}
            onSwapDirection={onSwapDirection}
          />
        )
    }
  }

  // Render
  return (
    <div>
      <div className='pb-4'>
        <ModelVersionNavigation />
      </div>
      <ElementInfo element={interactions.interModel.clicked} />
      <div>{getEditor()}</div>
    </div>
  )
}

export default Editor
