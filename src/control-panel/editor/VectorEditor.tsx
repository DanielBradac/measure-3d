import { useContext } from 'react'
import { Vector } from '../../data-model/Vector'
import { AlertContext } from '../../context/GlobalContextComponent'
import { ErrorMessage } from '../../common/AlertMessageTypes'

interface VectortEditorProps {
  vector: Vector
  onDeleteVector: (deletedPoint: Vector) => void
  onSwapDirection: (vector: Vector) => void
}

const VectorEditor = ({
  vector,
  onDeleteVector,
  onSwapDirection,
}: VectortEditorProps) => {
  const throwMessage = useContext(AlertContext)

  const deleteVector = () => {
    try {
      onDeleteVector(vector)
    } catch (e: unknown) {
      throwMessage(
        new ErrorMessage(
          e instanceof Error ? e.message : 'Unkown error occured'
        )
      )
    }
  }

  // Render
  return (
    <div>
      <div className='pl-2 py-2 w-full'>
        <button
          type='submit'
          className='buttonPrimary'
          onClick={() => onSwapDirection(vector)}
        >
          Swap direction
        </button>
      </div>

      <div className='pl-2 w-full'>
        <button className='buttonError' onClick={deleteVector}>
          Delete vector
        </button>
      </div>
    </div>
  )
}

export default VectorEditor
