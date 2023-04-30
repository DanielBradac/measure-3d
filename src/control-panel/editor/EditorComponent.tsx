import { useContext } from 'react'
import { InteractionContext } from '../../context/GlobalContextComponent'
import ElementInfo from '../ElementInfoComponent'

const Editor = () => {
  // Interaction context
  const interactions = useContext(InteractionContext)

  // Render
  return (
    <div>
      <ElementInfo element={interactions.interModel.clicked} />
    </div>
  )
}

export default Editor
