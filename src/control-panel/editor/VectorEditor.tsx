import { useContext } from 'react'
import { Vector } from '../../data-model/Vector'
import {
  AlertContext,
  ModelContext,
} from '../../context/GlobalContextComponent'
import { ErrorMessage } from '../../common/AlertMessageTypes'

interface VectortEditorProps {
  vector: Vector
}

const VectorEditor = ({ vector }: VectortEditorProps) => {
  const { removeVector, swapDirection } = useContext(ModelContext)
  const throwMessage = useContext(AlertContext)

  const onRemoveVector = () => {
    try {
      removeVector(vector)
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
          onClick={() => swapDirection(vector)}
        >
          Swap direction
        </button>
      </div>

      <div className='pl-2 w-full'>
        <button className='buttonError' onClick={onRemoveVector}>
          Delete vector
        </button>
      </div>
    </div>
  )
}

export default VectorEditor
