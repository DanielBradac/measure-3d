import { useContext } from 'react'
import { Vector } from '../../data-model/Vector'
import { ModelContext } from '../../context/GlobalContextComponent'

interface VectortEditorProps {
  vector: Vector
}

const VectorEditor = ({ vector }: VectortEditorProps) => {
  const { removeVector, swapDirection } = useContext(ModelContext)

  const onRemoveVector = () => {
    removeVector(vector)
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
